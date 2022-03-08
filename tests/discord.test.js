/**
 @Project: Discord Virtual Assistant
 @Title: discord_test.js
 @Authors: Ian Sodersjerna, Jacob Austin, Jonathan Tucker, Nick Miceli
 @Created: 2/19/2022
 @Description: Unit testing for discord interface.

 @Changelog:
 2/19/2022 IS:Added constructor test
 */
const DiscordHandler = require('../src/discord');

let discord_token;
try {
	const { token } = require('../config.json');
	discord_token = token;
}
catch (ex) {
	require('dotenv').config();
	discord_token = process.env.TOKEN;
}

// eslint-disable-next-line no-undef
beforeAll(() => {
	const discordclient = new DiscordHandler(discord_token);
	return discordclient;
});

/*
Tests for discord module will go here
 */

// eslint-disable-next-line no-undef
test('Discord constructor', () => {
	const discordclient = new DiscordHandler(discord_token);
	// eslint-disable-next-line no-undef
	expect(discordclient).toBeDefined();
});