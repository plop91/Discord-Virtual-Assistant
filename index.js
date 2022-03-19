/**
 @Project: Discord Virtual Assistant
 @Title: index.js
 @Authors: Ian Sodersjerna, Jacob Austin, Jonathan Tucker, Nick Miceli
 @Created: 2/19/2022
 @Description: Main file for program.

 @Changelog:
 3/19/2022 IS:Convert main loop into async function and add sleep function.
 2/25/2022 IS:Added import statement for config file and import for environmental variables as needed.
 2/19/2022 IS:Added import statements and basic operation.
 */
const DiscordHandler = require('./src/discord');
const Parser = require('./src/parser');
const S2T = require('./src/s2t');

const discordclient = new DiscordHandler();
const parser = new Parser(discordclient);
const speech2text = new S2T();

/**
 * Helper function, sleeps for x ms.
 * @param ms miliseconds to sleep
 */
function sleep(ms) {
	return new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
}


discordclient.login().then(async () => {
	let cont = true;
	while (cont) {
		// if the discord client has audio ready to process
		if (discordclient.audio_ready) {
			// transcribe the audio using the speech to text module
			const transcript = await speech2text.transcribe(discordclient.audio_clip);
			// Parse the transcript and preform actions
			const status = parser.parse(transcript);

			if (!status) {
				cont = false;
			}
		}
		await sleep(100);
	}
},
).finally(() => {
	discordclient.logout().then(() => console.log('Bot shutdown successfully'));
});
