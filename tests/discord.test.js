/**
 @Project: Discord Virtual Assistant
 @Title: discord_test.js
 @Authors: Ian Sodersjerna, Jacob Austin, Jonathan Tucker, Nick Miceli
 @Created: 2/19/2022
 @Description: Unit testing for discord interface.

 @Changelog:
 3/19/2022 IS: add login, logout and default audio queue and status tests.
 2/19/2022 IS:Added constructor test
 */
const DiscordHandler = require('../src/discord');


// eslint-disable-next-line no-undef
describe('Base Discord', () => {

	let discord = null;

	async function setup() {
		discord = new DiscordHandler();
	}

	async function logout() {
		await discord.logout();
	}

	/*
    Tests for discord module will go here
     */

	// eslint-disable-next-line no-undef
	beforeEach(async () => {
		await setup();
	});

	// eslint-disable-next-line no-undef
	afterEach(async () => {
		await logout();
	});

	// eslint-disable-next-line no-undef
	test('Discord constructor', async () => {
		// eslint-disable-next-line no-undef
		expect(discord).toBeDefined();
	});

	// eslint-disable-next-line no-undef
	test('Discord audio_status defaults to false', async () => {
		// eslint-disable-next-line no-undef
		expect(discord.audio_ready).toBeFalsy();
	});

	// eslint-disable-next-line no-undef
	test('Discord audio_queue defaults to empty', async () => {
		// eslint-disable-next-line no-undef
		expect(discord.audio_queue.length).toEqual(0);
	});
});

// // eslint-disable-next-line no-undef
// describe('login/logout discord', () => {
//
//
// 	// eslint-disable-next-line no-undef
// 	test('Discord login', async () => {
// 		const discordclient = new DiscordHandler();
// 		// eslint-disable-next-line no-undef
// 		expect(discordclient).toBeDefined();
// 		const status = await discordclient.login();
// 		// eslint-disable-next-line no-undef
// 		expect(status).toBeTruthy();
// 	});
//
// 	// eslint-disable-next-line no-undef
// 	test('Discord logout', async () => {
// 		const discordclient = new DiscordHandler();
// 		// eslint-disable-next-line no-undef
// 		expect(discordclient).toBeDefined();
// 		await discordclient.login();
//
// 		// eslint-disable-next-line no-undef
// 		expect(discordclient).toBeDefined();
// 		const status = await discordclient.logout();
// 		// eslint-disable-next-line no-undef
// 		expect(status).toBeTruthy();
// 	});
// });