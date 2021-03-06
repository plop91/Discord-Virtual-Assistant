/**
 @Project:Discord Virtual Assistant
 @Title: s2t.js
 @Authors: Ian Sodersjerna, Jacob Austin, Jonathan Tucker, Nick Miceli
 @Created: 2/19/2022
 @Description:  Interface with Speech-to-Text API

 @Changelog:
 3/27/2022 IS: Changed encoding to WAV and added channel count and separate channel recognition to support dual channel audio.
 3/21/2022 JT: finished first working version
 3/20/2022 JT: changed encoding to OGG_OPUS
 3/14/2022 JT: added Google Speech-To-Text and began work on transcription
 2/19/2022 IS: added basic structure
 */

const speech = require('@google-cloud/speech');
const fs = require('fs');

class S2T {
    constructor() {
        let key = process.env.PRIVATE_KEY;
		key = key.replace(/(\\n)/g, '\n');
		this.s2tClient = new speech.SpeechClient({
			credentials: {
				private_key: key,
				client_email: process.env.CLIENT_EMAIL,
			},
		});
    }

    /**
	 * Function takes in a path to an audio file in WAV format and uses
     * Google's speech-to-text API to create a transcript. The transcript
     * is then returned as a string.
	 * @param filepath: the path to the audio file
	 * @returns {string}: the transcription returned by Google's speech-to-text
	 */
    async transcribe(filepath) {
        // Set up information for transcription request.
        const languageCode = 'en-US';

        const config = {
            languageCode: languageCode,
			audioChannelCount: 2,
			enableSeparateRecognitionPerChannel: true,
		};

        const audio = {
            content: fs.readFileSync(filepath).toString('base64')
        };

        const request = {
            config: config,
            audio: audio
        };

        // Send request and receive response.
        const [operation] = await this.s2tClient.longRunningRecognize(request);
        const [response] = await operation.promise();

        // Return the transcription.
        const transcription = response.results
            .map(result => result.alternatives[0].transcript);
        return transcription[0];
    }
}

module.exports = S2T;