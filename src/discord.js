/**
 @Project: Discord Virtual Assistant
 @Title: discord.js
 @Authors: Ian Sodersjerna, Jacob Austin, Jonathan Tucker, Nick Miceli
 @Created: 2/19/2022
 @Description: Interface with discord API

 @Changelog:
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
	constructor(token) {
		// Discord token
		this.token = token;

		// Voice recording.
		this.audio_ready = false;
		this.audio_queue = [];

		this.pool = mariadb.createPool({
			// process.env.TOKEN
			host: process.env.DVA_DATABASE_HOST,
			user:process.env.DVA_DATABASE_USER,
			password: process.env.DVA_DATABASE_PASSWORD,
			connectionLimit: 5,
		});

		this.pool.getConnection()
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

}


/**
 * Discord Bot Handler class
 */
class DiscordHandler extends DiscordHandlerGeneric {
	/**
     * Base constructor, sets up bot, on message functions and logs the bot in.
     * @param token The token used to log the bot in.
     */
	constructor(token) {
		super(token);
		// Discord API client object.
		this.client = new Discord.Client();

		// Voice connection defaulted to null indicating bot is not connected to voice.
		this.connection = null;

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
				const audio = this.connection.receiver.createStream(message.author, { mode: 'pcm' });
				// save audio stream, refer to https://v12.discordjs.guide/voice/receiving-audio.html#basic-usage for playback information
				if (!fs.existsSync('recordings')) {
					fs.mkdirSync('recordings');
				}
				const writer = fs.createWriteStream('recordings/' + message.id);
				audio.pipe(writer);
				writer.on('finish', () => {
					this.audio_queue.push(message.id);
					this.audio_ready = true;
					message.channel.send('Recording finished');
				});

			}
			else if (message.content === 'test') {
				this.pool.getConnection()
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
			console.log('Discord Bot Ready!');
		});

		// Log the bot in.
		this.client.login(this.token);
	}

}

/**
 * Testing Discord Bot Handler class
 */
// eslint-disable-next-line no-unused-vars
class DiscordHandlerTest extends DiscordHandlerGeneric {
	constructor() {
		super();
	}


}

// Export module.
module.exports = DiscordHandler;