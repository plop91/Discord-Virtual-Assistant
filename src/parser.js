/**
 @Project:Discord Virtual Assistant
 @Title: parser.js
 @Authors: Ian Sodersjerna, Jacob Austin, Jonathan Tucker, Nick Miceli
 @Created: 2/19/2022
 @Description: Responsible for parsing user input

 @Changelog:
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
		return 0;
	}

}
class ParserTest extends ParserGeneric {
	constructor(discord) {
		super(discord);
	}
	parse(text) {
		// do test thing
		return 0;
	}

}
module.exports = Parser;