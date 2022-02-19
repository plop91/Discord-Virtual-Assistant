/**
 @Project:Discord Virtual Assistant
 @Title: t2s_test.js
 @Authors: Ian Sodersjerna, Jacob Austin, Jonathan Tucker, Nick Miceli
 @Created: 2/19/2022
 @Description:  Interface with Text-to-Speech API

 @Changelog:
 */
const T2S = require("../src/t2s")
/*
Tests for text to speech module will go here
 */

test('Discord constructor', () => {
    let text2speech = new T2S();
    expect(text2speech).toBeDefined();
});