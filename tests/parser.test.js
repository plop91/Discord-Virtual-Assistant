/**
 @Project:Discord Virtual Assistant
 @Title: parser_test.js
 @Authors: Ian Sodersjerna, Jacob Austin, Jonathan Tucker, Nick Miceli
 @Created: 2/19/2022
 @Description: Unit testing for parser.

 @Changelog:
 3/16/2022 JA:Added two tests
 2/19/2022 IS:Added constructor test
 */
const Parser = require("../src/parser")
const DiscordHandler = require("../src/discord");
/*
Tests for parser module will go here
 */
test('Discord constructor', () => {
	const discordclient = new DiscordHandler();
	expect(discordclient).toBeDefined();
	const parser = new Parser(discordclient);
	expect(parser).toBeDefined();
});

test('Test default command parsing', () => {
	const discordClient = new DiscordHandler();
	const parser = new Parser(discordClient);
	const result = parser.parse('discord what time is it');
	expect(result).toBe('time found');
});

test('Test no command found', () => {
	const discordClient = new DiscordHandler();
	const parser = new Parser(discordClient);
	const result = parser.parse('discord why do it be like that');
	expect(result).toBe('no command found');
});
