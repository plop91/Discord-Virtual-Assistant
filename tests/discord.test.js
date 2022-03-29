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

	// eslint-disable-next-line no-undef
	test('Discord audio_queue dequeue first item in queue', async () => {
		discord.audio_queue.push('test1');
		discord.audio_queue.push('test2');
		discord.audio_queue.push('test3');
		// eslint-disable-next-line no-undef
		expect(discord.audio_clip).toEqual('test1');
		// eslint-disable-next-line no-undef
		expect(discord.audio_clip).toEqual('test2');
		// eslint-disable-next-line no-undef
		expect(discord.audio_clip).toEqual('test3');
	});
	// eslint-disable-next-line no-undef
	test('discord token environmental variable', async () => {
		// eslint-disable-next-line no-undef
		expect(discord.token).toBeDefined();
	});

});

// eslint-disable-next-line no-undef
// describe('login/logout discord', () => {
//
// 	let discord = null;
//
// 	async function setup() {
// 		discord = new DiscordHandler();
// 	}
//
// 	// eslint-disable-next-line no-undef
// 	beforeEach(async () => {
// 		await setup();
// 	});
//
//
// 	// eslint-disable-next-line no-undef
// 	test('Discord login', async () => {
// 		const status = await discord.login();
// 		await sleep(100);
// 		// eslint-disable-next-line no-undef
// 		expect(status).toBeTruthy();
// 		await discord.logout();
// 	});
//
// 	// eslint-disable-next-line no-undef
// 	test('Discord logout', async () => {
// 		await discord.login();
// 		await sleep(100);
// 		const status = await discord.logout();
// 		// eslint-disable-next-line no-undef
// 		expect(status).toBeTruthy();
// 	});
// });