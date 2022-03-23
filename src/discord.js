/**
 @Project: Discord Virtual Assistant
 @Title: discord.js
 @Authors: Ian Sodersjerna, Jacob Austin, Jonathan Tucker, Nick Miceli
 @Created: 2/19/2022
 @Description: Interface with discord API

 @Changelog:
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
	 * Generic constructor, used to set discord token, prepare the audio queue, and create a mariadb pool to access database.
	 */
	constructor(timeout) {
		this.LOGIN_TIMEOUT = timeout;

		// Discord token
		this.token = process.env.DISCORD_TOKEN;

		// Voice recording.
		this.audio_ready = false;
		this.audio_queue = [];

		this.pool = mariadb.createPool({
			// process.env.TOKEN
			host: process.env.DVA_DATABASE_HOST,
			user: process.env.DVA_DATABASE_USER,
			password: process.env.DVA_DATABASE_PASSWORD,
			connectionLimit: 10,
		});

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

	async login() {
		await this.pool.getConnection()
			.then (conn => {
				// create the database if it does not exist should only occur when changing databases.
				conn.query('CREATE DATABASE IF NOT EXISTS dva');
				// change into dva database
				conn.query('USE dva');
				// create last_seen table if it does not exist
				return conn.query('CREATE TABLE IF NOT EXISTS last_seen (username CHAR(100) PRIMARY KEY, server CHAR(20))');
			})
			.then((res) => {
				console.log(res);
			}).catch(err => {
				console.log(err);
			});
	}

	async logout() {
		await this.pool.end();
	}

}


/**
 * Discord Bot Handler class
 */
class DiscordHandler extends DiscordHandlerGeneric {
	/**
     * Base constructor, sets up bot, on message functions and logs the bot in.
     */
	constructor() {
		super(20000);
		// Discord API client object.
		this.client = new Discord.Client();

		// Voice connection defaulted to null indicating bot is not connected to voice.
		this.connection = null;

		this.connected = false;

		// Message handling function.
		this.client.on('message', async message => {

			console.log(message.author.username + ': ' + message.content);
			// If the bot sent the message we can ignore the rest.
			if (message.author.bot) return;

			this.pool.getConnection()
				.then (conn => {
					conn.query('USE dva');
					return conn.query('REPLACE INTO last_seen VALUES (?, ?)', [message.author.username, message.guild.id]);
				})
				.then((res) => {
					console.log(res);
				})
				.catch(err => {
					console.log(err);
				});

			if (message.content === 'join') {
				// Join the same voice channel of the author of the message
				if (message.member.voice.channel) {
					this.connection = await message.member.voice.channel.join();
				}
				else {
					message.channel.send('You are not connected to a server');
				}
			}
			else if (message.content === 'record') {
				message.channel.send('Recording starting now');
				if (!this.connection) {
					if (message.member.voice.channel) {
						this.connection = await message.member.voice.channel.join();
					}
					else {
						message.channel.send('You are not connected to a server');
						return;
					}
				}
				// create a recorder object
				const audio = this.connection.receiver.createStream(message.author, { mode: 'opus' });
				// save audio stream, refer to https://v12.discordjs.guide/voice/receiving-audio.html#basic-usage for playback information
				if (!fs.existsSync('recordings')) {
					fs.mkdirSync('recordings');
				}
				const writer = fs.createWriteStream('recordings/' + message.id + '.ogg');
				audio.pipe(writer);
				await writer.on('finish', () => {
					// this.connection.play(fs.createReadStream('recordings/' + message.id + '.ogg'), { type: 'ogg/opus' });
					this.audio_queue.push('recordings/' + message.id + '.ogg');
					this.audio_ready = true;
					message.channel.send('Recording finished');
				});

			}
			else if (message.content === 'test') {
				await this.pool.getConnection()
					.then (conn => {
						conn.query('USE dva');
						return conn.query('SELECT * FROM last_seen');
					})
					.then((res) => {
						console.log(res);
					})
					.catch(err => {
						console.log(err);
					});
			}
		});

		// Function that runs once at startup.
		this.client.once('ready', () => {
			// console.log('Discord Bot Ready!');
			this.connected = true;
		});

	}

	async login() {
		class Login_error extends Error {}
		try {
			const start = Date.now();
			await super.login();
			// Log the bot in.
			await this.client.login(this.token);
			while (!this.connected) {
				const now = Date.now();
				if (now - start > this.LOGIN_TIMEOUT) {
					throw new Login_error('login timer exceeded');
				}
			}
			return true;
		}
		catch (error) {
			console.log(error);
			return false;
		}
	}

	async logout() {
		try {
			await super.logout();
			await this.client.destroy();
			return true;
		}
		catch (error) {
			console.log(error);
			return false;
		}
	}

}

/**
 * Testing Discord Bot Handler class
 */
// eslint-disable-next-line no-unused-vars
class DiscordHandlerTest extends DiscordHandlerGeneric {
	constructor() {
		super(30000);
	}


}

// Export module.
module.exports = DiscordHandler;