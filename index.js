/**
 @Project: Discord Virtual Assistant
 @Title: index.js
 @Authors: Ian Sodersjerna, Jacob Austin, Jonathan Tucker, Nick Miceli
 @Created: 2/19/2022
 @Description: Main file for program.

 @Changelog:
 2/25/2022 IS:Added import statement for config file and import for environmental variables as needed
 2/19/2022 IS:Added import statements and basic operation.
 */
const DiscordHandler = require('./src/discord');
const Parser = require('./src/parser');
const S2T = require('./src/s2t');

let discord_token;
try {
	const { token } = require('./config.json');
	discord_token = token;
}
catch (ex) {
	require('dotenv').config();
	discord_token = process.env.TOKEN;
}

const discordclient = new DiscordHandler(discord_token);
const parser = new Parser(discordclient);
const speech2text = new S2T();


let cont = false;
while (cont) {
	// if the discord client has audio ready to process
	if (discordclient.audio_ready) {
		// transcribe the audio using the speech to text module
		const transcript = speech2text.transcribe(discordclient.audio_clip);
		// Parse the transcript and preform actions
		const status = parser.parse(transcript);

		if (!status) {
			cont = false;
		}
	}
}
// discordclient.shutdown();