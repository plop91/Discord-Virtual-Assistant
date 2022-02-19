/**
 @Project:Discord Virtual Assistant
 @Title: s2t_test.js
 @Authors: Ian Sodersjerna, Jacob Austin, Jonathan Tucker, Nick Miceli
 @Created: 2/19/2022
 @Description:  Interface with Text-to-Speech API

 @Changelog:
 */
const S2T = require("../src/s2t")
/*
Tests for speech to text module will go here
 */

test('Discord constructor', () => {
    const speech2text = new S2T();
    expect(speech2text).toBeDefined();
});