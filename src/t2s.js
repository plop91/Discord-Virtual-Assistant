/**
 @Project:Discord Virtual Assistant
 @Title: t2s.js
 @Authors: Ian Sodersjerna, Jacob Austin, Jonathan Tucker, Nick Miceli
 @Created: 2/19/2022
 @Description:  Interface with Text-to-Speech API

 @Changelog:
3/15/2022 NM: implemented convert method
2/19/2022 IS: added basic structure
 */
const textToSpeech = require('@google-cloud/text-to-speech');
const fs = require('fs');
const util = require('util');

class T2SGeneric {

	// eslint-disable-next-line no-unused-vars
	convert(text) {
		return null;
	}
}

class T2S extends T2SGeneric {
	constructor() {
		super();
	}
	async convert(text) {
		const client = new textToSpeech.TextToSpeechClient();
		const request = {
			input: { text: text },
			voice: { languageCode: 'en-US', ssmlGender: 'NEUTRAL' },
			audioConfig: { audioEncoding: 'MP3' },
		};
		// get response from cloud text-to-speech
		const [response] = await client.synthesizeSpeech(request);
		const writeFile = util.promisify(fs.writeFile);
		const fileToWrite = 'response.mp3';
		// write to file called 'response.mp3'
		await writeFile(fileToWrite, response.audioContent, 'binary');
		// return path to new audio
		return fileToWrite;
	}
}

// eslint-disable-next-line no-unused-vars
class T2STest extends T2SGeneric {
	constructor() {
		super();
	}
	// eslint-disable-next-line no-unused-vars
	convert(text) {
		// return test audio
		return null;
	}
}
module.exports = T2STest;