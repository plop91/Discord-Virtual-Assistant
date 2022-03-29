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

test('Test parsing time command', () => {
	const discordClient = new DiscordHandler();
	const parser = new Parser(discordClient);
	const result = parser.parse('discord time');
	expect(result).toBe('Stated time');
});

test('Test parsing play command', () => {
	const discordClient = new DiscordHandler();
	const parser = new Parser(discordClient);
	const result = parser.parse('discord play response.mp3');
	expect(result).toBe('Played file');
});

test('Test parsing weather command', () => {
	const discordClient = new DiscordHandler();
	const parser = new Parser(discordClient);
	const result = parser.parse('discord weather');
	expect(result).toBe('Stated weather');
});

test('Test parsing ban command', () => {
	const discordClient = new DiscordHandler();
	const parser = new Parser(discordClient);
	const result = parser.parse('discord time');
	expect(result).toBe('Banned user');
});

test('Test parsing dm command', () => {
	const discordClient = new DiscordHandler();
	const parser = new Parser(discordClient);
	const result = parser.parse('discord time');
	expect(result).toBe('DMed user');
});

test('Test no command found', () => {
	const discordClient = new DiscordHandler();
	const parser = new Parser(discordClient);
	const result = parser.parse('discord why do it be like that');
	expect(result).toBe('no command found');
});
