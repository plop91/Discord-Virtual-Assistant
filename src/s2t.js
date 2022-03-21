/**
 @Project:Discord Virtual Assistant
 @Title: s2t.js
 @Authors: Ian Sodersjerna, Jacob Austin, Jonathan Tucker, Nick Miceli
 @Created: 2/19/2022
 @Description:  Interface with Speech-to-Text API

 @Changelog:
 3/20/2022 JT: changed encoding to OGG_OPUS
 3/14/2022 JT: added Google Speech-To-Text and began work on transcription
 2/19/2022 IS: added basic structure
 */

const speech = require('@google-cloud/speech');
const fs = require('fs');

class S2T {
    /**
	 * Function takes in a path to an audio file in OGG_OPUS format and uses
     * Google's speech-to-text API to create a transcript. The transcript
     * is then returned as a string.
	 * @param filepath: the path to the audio file
	 * @returns {string}: the transcription returned by Google's speech-to-text
	 */
    async transcribe(filepath){
        // Set up information for transcription request.
        const client = new speech.SpeechClient();
        const encoding = 'OGG_OPUS';
        const sampleRateHertz = 48000;
        const languageCode = 'en-US';

        const config = {
            encoding: encoding,
            sampleRateHertz: sampleRateHertz,
            languageCode: languageCode
        };

        const audio = {
            content: fs.readFileSync(filepath).toString('base64')
        };

        const request = {
            config: config,
            audio: audio
        };
          
        // Send request and receive response.
        const operation = await client.longRunningRecognize(request);
        const response = await operation.promise();

        // Return the transcription.
        return response.results.map(result => result.alternatives[0].transcript);
    }
}

module.exports = S2T;