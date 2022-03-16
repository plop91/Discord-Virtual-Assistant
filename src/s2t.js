/**
 @Project:Discord Virtual Assistant
 @Title: s2t.js
 @Authors: Ian Sodersjerna, Jacob Austin, Jonathan Tucker, Nick Miceli
 @Created: 2/19/2022
 @Description:  Interface with Speech-to-Text API

 @Changelog:
 3/14/2022 JT: added Google Speech-To-Text and began work on transcription
 2/19/2022 IS: added basic structure
 */

const speech = require('@google-cloud/speech');
const fs = require('fs');

class S2TGeneric {
	// eslint-disable-next-line no-unused-vars
	async transcribe(audio) {
		return '';
	}
}

class S2T extends S2TGeneric {
	constructor() {
		super();
	}

	async transcribe(audio) {
		// Set up information for transcription request.
		const client = new speech.SpeechClient();
		const filename = audio;
		const encoding = 'FLAC';
		const sampleRateHertz = 48000;
		const languageCode = 'en-US';

		const config = {
			encoding: encoding,
			sampleRateHertz: sampleRateHertz,
			languageCode: languageCode,
		};

		const audioFile = {
			content: fs.readFileSync(filename).toString('base64'),
		};

		const request = {
			config: config,
			audioFile: audioFile,
		};

		// Send request and receive response.
		const operation = await client.longRunningRecognize(request);
		const response = await operation.promise();

		// Return the transcription.
		return response.results.map(result => result.alternatives[0].transcript);
	}
}

class S2TTest extends S2TGeneric {
	constructor() {
		super();
	}
	transcribe(audio) {
		// return test transcription
		return 'discord what time is it';
	}
}
module.exports = S2T;