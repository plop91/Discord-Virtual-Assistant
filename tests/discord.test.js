/**
 @Project:Discord Virtual Assistant
 @Title: discord_test.js
 @Authors: Ian Sodersjerna, Jacob Austin, Jonathan Tucker, Nick Miceli
 @Created: 2/19/2022
 @Description: Unit testing for discord interface.

 @Changelog:
 2/19/2022 IS:Added constructor test
 */
const DiscordHandler = require("../src/discord")
/*
Tests for discord module will go here
 */

test('Discord constructor', () => {
    const discordclient = new DiscordHandler();
    expect(discordclient).toBeDefined();
});