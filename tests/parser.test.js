/**
 @Project:Discord Virtual Assistant
 @Title: parser_test.js
 @Authors: Ian Sodersjerna, Jacob Austin, Jonathan Tucker, Nick Miceli
 @Created: 2/19/2022
 @Description:  Interface with Text-to-Speech API

 @Changelog:
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