/**
 @Project:Discord Virtual Assistant
 @Title: s2t_test.js
 @Authors: Ian Sodersjerna, Jacob Austin, Jonathan Tucker, Nick Miceli
 @Created: 2/19/2022
 @Description: Unit testing for Speech-to-Text interface.

 @Changelog:
 2/19/2022 IS:Added constructor test
 */
const S2T = require("../src/s2t")
/*
Tests for speech to text module will go here
 */

test('S2T constructor', () => {
    const speech2text = new S2T();
    expect(speech2text).toBeDefined();
});