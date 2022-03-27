/**
 @Project: Discord Virtual Assistant
 @Title: index.js
 @Authors: Ian Sodersjerna, Jacob Austin, Jonathan Tucker, Nick Miceli
 @Created: 2/19/2022
 @Description: Main file for program.

 @Changelog:
 3/19/2022 IS: Add audio conversion with ffmpeg.
 3/19/2022 IS: Convert main loop into async function and add sleep function.
 2/25/2022 IS: Added import statement for config file and import for environmental variables as needed.
 2/19/2022 IS: Added import statements and basic operation.
 */
const DiscordHandler = require('./src/discord');
const Parser = require('./src/parser');
const S2T = require('./src/s2t');
const T2S = require('./src/t2s');
const { execSync } = require('child_process');

const discordclient = new DiscordHandler();
const parser = new Parser(discordclient);
const speech2text = new S2T();
const text2speech = new T2S();

/**
 * Helper function, sleeps for x ms.
 * @param ms miliseconds to sleep
 */
function sleep(ms) {
	return new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
}

function convert_audio(audio) {

	const new_filename = audio.slice(0, -4) + '.wav';
	console.log('audio conversion has started');
	const command = 'ffmpeg -f s16le -ar 48k -ac 2 -i ' + audio + ' ' + new_filename;
	console.log(command);
	execSync(command);
	console.log('audio conversion has ended');
	return new_filename;
}

discordclient.login().then(async () => {
	const cont = true;
	while (cont) {
		// if the discord client has audio ready to process
		if (discordclient.audio_status) {
			let audio = await discordclient.audio_clip;
			await sleep(1);
			audio = convert_audio(audio);

			// transcribe the audio using the speech to text module
			const transcript = await speech2text.transcribe(audio);

			console.log('Transcript:' + transcript);

			// Parse the transcript and preform actions
			const status = parser.parse(transcript);

			await text2speech.convert(status);

			discordclient.play('response.mp3');

		}
		await sleep(100);
	}
},
).finally(() => {
	discordclient.logout().then(() => console.log('Bot shutdown successfully'));
});
