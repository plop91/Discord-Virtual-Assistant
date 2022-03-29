/**
 @Project:Discord Virtual Assistant
 @Title: parser.js
 @Authors: Ian Sodersjerna, Jacob Austin, Jonathan Tucker, Nick Miceli
 @Created: 2/19/2022
 @Description: Responsible for parsing user input

 @Changelog:
 3/29/2022 JA: Added a function to parse the text and return the command
 3/16/2022 JA: Added shell functionality for testing
 2/19/2022 IS: Added basic structure
 */
const DiscordHandler = require('./discord');
const T2S = require('./t2s');

class ParserGeneric {
	constructor(discord) {
		this.discord = discord;
		this.text2speech = new T2S();
	}
	parse(text) {
		return -1;
	}
}
class Parser extends ParserGeneric {
	constructor(discord) {
		super(discord);
	}
	parse(text) {
		// if first word is 'discord' then strip from string
		if (text.toLowerCase().startsWith('discord')) {
			text = text.substring(8);
			// check next word for possible commands
			const sentence = text.split(' ');
			switch (sentence[0].toLowerCase()) {
			case 'play':
				this.discord.play(sentence[1]);
				break;
			case 'time':
				this.text2speech.convert(new Date().toLocaleTimeString());
				this.discord.play('response.mp3');
				break;
			case 'weather':
				this.text2speech.convert('Feature coming soon!');
				this.discord.play('response.mp3');
				break;
			case 'ban':
				// const user = sentence[1];
				// this.discord.ban(user);
				this.text2speech.convert('Feature coming soon!');
				this.discord.play('response.mp3');
				break;
			case 'dm':
				// const user = sentence[1];
				// const message = sentence[2:];
				// this.discord.dm(user, message);
				this.text2speech.convert('Feature coming soon!');
				this.discord.play('response.mp3');
				break;
			}
		}
		return 'no command found';
	}
}
class ParserTest extends ParserGeneric {
	constructor(discord) {
		super(discord);
	}
	parse(text) {
		// return set string for testing
		return 'discord join general';
	}

}
module.exports = Parser;