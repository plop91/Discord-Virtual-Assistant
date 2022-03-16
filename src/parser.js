/**
 @Project:Discord Virtual Assistant
 @Title: parser.js
 @Authors: Ian Sodersjerna, Jacob Austin, Jonathan Tucker, Nick Miceli
 @Created: 2/19/2022
 @Description: Responsible for parsing user input

 @Changelog:
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
		}

		// TODO: implement checking if text is an included command

		// basic shell for testing, only covers one case
		if (text.toLowerCase() === 'what time is it') {
			this.text2speech.convert('It is ' + new Date().toLocaleTimeString());
			return 'time found';
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