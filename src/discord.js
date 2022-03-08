/**
 @Project: Discord Virtual Assistant
 @Title: discord.js
 @Authors: Ian Sodersjerna, Jacob Austin, Jonathan Tucker, Nick Miceli
 @Created: 2/19/2022
 @Description: Interface with discord API

 @Changelog:
 2/08/2022 IS: Add sqlite3 database with temp test function.
 2/25/2022 IS: Made token a parameter and moved config import to index.js
 2/19/2022 IS: Added basic structure, added basic message handler with basic audio channel join and record functions
 */

const Discord = require('discord.js');
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

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

		// Check if database directory exists, if not create it
		fs.access('./db', function(error) {
			if (error) {
				fs.mkdirSync('./db');
			}
		});


		// Create database object
		this.db = new sqlite3.Database('./db/discord.db', (err) => {
			if (err) {
				console.error(err.message);
				throw Error;
			}
			else {
				console.log('Connected to the discord database.');
			}
		});


		const query = 'CREATE TABLE IF NOT EXISTS recent_active_server (user char, server int);';

		this.db.run(query, (err) => {
			if (err) {
				console.error(err.message);
				throw Error;
			}
			else {
				console.log('Checked local tables');
			}
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
			this.db.run('INSERT INTO recent_active_server(user) VALUES(?), (?)', message.author.username, message.guild.id, function(err) {
				if (err) {
					return console.log(err.message);
				}
				// get the last insert id
				console.log(`A row has been inserted with rowid ${this.lastID}`);
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
				audio.pipe(fs.createWriteStream(message.id));
				this.audio_queue.push(message.id);
				this.audio_ready = true;

			}
			else if (message.content === 'test') {
				const query = 'SELECT DISTINCT User user FROM recent_active_server ORDER BY user';
				this.db.all(query, (err, rows) => {
					if (err) {
						console.error(err.message);
						throw Error;
					}
					else {
						console.log('looked into local database');
						rows.forEach((row) => {
							console.log(row);
						});
					}
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


	send_dm(user, message) {

	}

}

/**
 * Testing Discord Bot Handler class
 */
class DiscordHandlerTest extends DiscordHandlerGeneric {
	constructor() {
		super();
	}


}

// Export module.
module.exports = DiscordHandler;