/**
 @Project:Discord Virtual Assistant
 @Title: t2s.js
 @Authors: Ian Sodersjerna, Jacob Austin, Jonathan Tucker, Nick Miceli
 @Created: 2/19/2022
 @Description:  Interface with Text-to-Speech API

 @Changelog:
3/17/2022 NM: changed text to speech client to use private key and client email
3/15/2022 NM: implemented convert method
2/19/2022 IS: added basic structure
 */
const textToSpeech = require('@google-cloud/text-to-speech');
const fs = require('fs');
const util = require('util');
require('dotenv').config();

class T2S {
	constructor() {
		// This variable is used for testing purposes to compare against known audio content.
		this.lastAudioContent = null;
		// Replace \\n (slash followed by n character) with \n (newline character)
		let key = process.env.PRIVATE_KEY;
		key = key.replace(/(\\n)/g, '\n');
		this.t2sClient = new textToSpeech.TextToSpeechClient({
			credentials: {
				private_key: key,
				client_email: process.env.CLIENT_EMAIL,
			},
		});
	}
	/**
	 * This function converts text to speech using Google's cloud text-to-speech api. The
	 * file containing the produced audio is named 'response.mp3' and is written to the
	 * main directory of this project. This function must be called from an async context so
	 * the call can be made with the 'await' keyword. This will force the program to wait for
	 * the file to be written before proceeding.
	 * @param text: the text that needs to be converted to speech
	 * @returns {Promise<unknown>}: a promise that the file will be written
	 */
	async convert(text) {
		// Construct request with the text parameter
		const request = {
			input: { text: text },
			voice: { languageCode: 'en-US', ssmlGender: 'NEUTRAL' },
			audioConfig: { audioEncoding: 'MP3' },
		};
		// Where the file should be written
		const fileToWrite = 'response.mp3';
		// get response from cloud text-to-speech
		const [response] = await this.t2sClient.synthesizeSpeech(request);
		const writeFile = util.promisify(fs.writeFile);
		// Remember the audio content before converting to .MP3 (for testing)
		this.lastAudioContent = response.audioContent;
		// Write file and return promise so the file can we 'awaited'
		return await writeFile(fileToWrite, response.audioContent, 'binary');
	}
}

module.exports = T2S;