/**
 @Project: Discord Virtual Assistant
 @Title: discord.js
 @Authors: Ian Sodersjerna, Jacob Austin, Jonathan Tucker, Nick Miceli
 @Created: 2/19/2022
 @Description: Interface with discord API

 @Changelog:
 3/25/2022 IS: create on_message function.
 3/24/2022 IS: add play function
 3/19/2022 IS: Upgrade to async functions, update token env name to DISCORD_TOKEN
 3/16/2022 IS: Update database to mariaDB
 2/08/2022 IS: Add sqlite3 database with temp test function.
 2/25/2022 IS: Made token a parameter and moved config import to index.js
 2/19/2022 IS: Added basic structure, added basic message handler with basic audio channel join and record functions
 */

const Discord = require('discord.js');
const mariadb = require('mariadb');
const fs = require('fs');
require('dotenv').config();

/**
 * Generic of the Discord Bot Handler class, used in testing
 */
class DiscordHandlerGeneric {

	/**
	 * Generic constructor, used to set discord token, prepare the audio queue.
	 */
	constructor() {
		// Discord token
		this.token = process.env.DISCORD_TOKEN;

		// Voice recording.
		this.audio_ready = false;
		this.audio_queue = [];
	}

	/**
     * check if there is an audio clip ready.
     * @returns boolean
     */
	get audio_status() {
		return this.audio_ready;
	}

	/**
     * Dequeue the next audio clip to be processed
     * @returns {*} Audio clip to be processed.
     */
	get audio_clip() {
		const clip = this.audio_queue.shift();
		if (this.audio_queue.length === 0) {
			this.audio_ready = false;
		}
		return clip;
	}

	/**
	 * create a mariadb pool to access database and check database.
	 * @returns {Promise<void>}
	 */
	async login() {
		this.pool = mariadb.createPool({
			// process.env.TOKEN
			host: process.env.DVA_DATABASE_HOST,
			user: process.env.DVA_DATABASE_USER,
			password: process.env.DVA_DATABASE_PASSWORD,
			connectionLimit: 10,
		});

		const success = await this.pool.getConnection()
			.then (conn => {
				try {
					// create the database if it does not exist should only occur when changing databases.
					conn.query('CREATE DATABASE IF NOT EXISTS dva');
					// change into dva database
					conn.query('USE dva');
					// create last_seen table if it does not exist
					conn.query('CREATE TABLE IF NOT EXISTS last_seen (username CHAR(100) PRIMARY KEY, server CHAR(20))');
					// create record_usage
					conn.query('CREATE TABLE IF NOT EXISTS record_usage (time DATETIME)');
					// create command usage
					conn.query('CREATE TABLE IF NOT EXISTS command_usage (command CHAR(100))');
					return conn.release();
				}
				catch (e) {
					return false;
				}
			});
		if (success !== false) {
			console.log('INFO:Database creation complete');
		}
	}

	/**
	 * Release database resources.
	 * @returns {Promise<void>}
	 */
	async logout() {
		if (this.pool) {
			await this.pool.end();
		}
	}

}


/**
 * Discord Bot Handler class
 */
class DiscordHandler extends DiscordHandlerGeneric {

	/**
     * Base constructor, sets up bot, and event handlers.
     */
	constructor() {
		super();
		// Discord API client object.
		this.client = new Discord.Client();

		// Voice connection defaulted to null indicating bot is not connected to voice.
		this.connection = null;

		// Message handling function.
		this.client.on('message', async message => {
			await this.on_message(message);
		});

		// Function that runs once at startup.
		this.client.once('ready', () => {
			console.log('INFO:Discord Bot Ready!');
		});

	}

	/**
	 * Function that handles a message event.
	 *
	 * @param message message object.
	 * @returns {Promise<void>}
	 */
	async on_message(message) {

		console.log(message.author.username + ': ' + message.content);
		// If the bot sent the message we can ignore the rest.
		if (message.author.bot) return;

		await this.pool.getConnection()
			.then (conn => {
				conn.query('USE dva');
				conn.query('REPLACE INTO last_seen VALUES (?, ?)', [message.author.username, message.guild.id]);
				return conn.release();
			});

		if (message.content === 'join') {
			await this.on_join(message);
		}
		else if (message.content.startsWith('play')) {
			await this.on_play(message);
		}
		else if (message.content === 'record') {
			await this.on_record(message);
		}
		else if (message.content === 'test') {
			await this.on_test(message);
		}
	}

	/**
	 * Function called when 'join' message is sent
	 * @param message message that called this function
	 * @returns {Promise<void>}
	 */
	async on_join(message) {
		// Join the same voice channel of the author of the message
		if (message.member.voice.channel) {
			this.connection = await message.member.voice.channel.join();
		}
		else {
			await message.channel.send('You are not connected to a server');
		}

	}

	/**
	 * Function called when 'play' message is sent
	 * @param message message that called this function
	 * @returns {Promise<void>}
	 */
	async on_play(message) {
		const args = message.content.split(' ');

		if (!args.length > 1) {
			await message.channel.send('must provide an argument');
			return;
		}

		if (!fs.existsSync(args[1])) {
			return;
		}
		const dispatcher = this.connection.play(args[1]);
		// const dispatcher = this.connection.play(fs.createReadStream('recordings/957639346616406076.ogg'), { type: 'ogg/opus' });

		dispatcher.on('start', () => {
			console.log('INFO:audio.mp3 is now playing!');
		});

		dispatcher.on('finish', () => {
			console.log('INFO:audio.mp3 has finished playing!');
		});

		// Always remember to handle errors appropriately!
		dispatcher.on('error', console.error);

	}

	/**
	 * Function called when 'record' message is sent
	 * @param message message that called this function
	 * @returns {Promise<void>}
	 */
	async on_record(message) {
		await this.pool.getConnection()
			.then (conn => {
				const t = new Date();
				const dateString = t.getUTCFullYear() + '-' + (t.getUTCMonth() + 1) + '-' + t.getUTCDate() + ' ' + t.getUTCHours() + ':' + t.getUTCMinutes() + ':' + t.getUTCSeconds();
				conn.query('USE dva');
				return conn.query('INSERT INTO record_usage VALUES (?)', [dateString]);
			});
		if (!this.connection) {
			if (message.member.voice.channel) {
				this.connection = await message.member.voice.channel.join();
			}
			else {
				message.channel.send('You are not connected to a server');
				return;
			}
		}
		message.channel.send('Recording starting now');
		// create a recorder object
		const audio = this.connection.receiver.createStream(message.author, { mode: 'pcm' });
		// save audio stream, refer to https://v12.discordjs.guide/voice/receiving-audio.html#basic-usage for playback information
		if (!fs.existsSync('recordings')) {
			fs.mkdirSync('recordings');
		}
		const writer = fs.createWriteStream('recordings/' + message.id + '.pcm');
		audio.pipe(writer);
		await writer.on('finish', () => {
			// this.connection.play(fs.createReadStream('recordings/' + message.id + '.ogg'), { type: 'ogg/opus' });
			this.audio_queue.push('recordings/' + message.id + '.pcm');
			this.audio_ready = true;
			message.channel.send('Recording finished');
		});
	}

	/**
	 * Function called when 'record' message is sent
	 * @param message message that called this function
	 * @returns {Promise<void>}
	 */
	async on_test(message) {
		const res = await this.pool.getConnection()
			.then (conn => {
				conn.query('USE dva');
				const q_res = conn.query('SELECT * FROM command_usage');
				conn.release();
				return q_res;
			});
		console.log('INFO:');
		console.log(res);
		await message.channel.send(res.toString());
	}

	/**
	 * Log the bot into the discord api and setup resources.
	 *
	 * @returns {Promise<boolean>}
	 */
	async login() {
		try {
			await super.login();
			await this.client.login(this.token);
			return true;
		}
		catch (error) {
			console.log('ERROR:' + error);
			return false;
		}
	}

	/**
	 * Log the bot out of the discord api and release resources.
	 *
	 * @returns {Promise<boolean>}
	 */
	async logout() {
		try {
			await super.logout();
			await this.client.destroy();
			delete this.client;
			return true;
		}
		catch (error) {
			console.log('ERROR:' + error);
			return false;
		}
	}

	/**
	 * Play an audio file through the voice connection.
	 *
	 * @param filename
	 * @returns {Promise<void>}
	 */
	async play(filename) {
		try {
			if (this.connection) {
				this.connection.play(filename);
			}
		}
		catch (e) {
			console.log('ERROR:' + e);
		}
	}
}

/**
 * Testing Discord Bot Handler class
 */
// eslint-disable-next-line no-unused-vars
class DiscordHandlerTest extends DiscordHandlerGeneric {
	/**
	 *
	 */
	constructor() {
		super();
	}


}

// Export module.
module.exports = DiscordHandler;