/**
 @Project:Discord Virtual Assistant
 @Title: discord_test.js
 @Authors: Ian Sodersjerna, Jacob Austin, Jonathan Tucker, Nick Miceli
 @Created: 2/19/2022
 @Description:  Interface with Text-to-Speech API

 @Changelog:
 */
const DiscordHandler = require("../src/discord")
/*
Tests for discord module will go here
 */

test('Discord constructor', () => {
    const discordclient = new DiscordHandler();
    expect(discordclient).toBeDefined();
});