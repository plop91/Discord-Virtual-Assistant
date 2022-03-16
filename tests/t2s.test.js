/**
 @Project:Discord Virtual Assistant
 @Title: t2s_test.js
 @Authors: Ian Sodersjerna, Jacob Austin, Jonathan Tucker, Nick Miceli
 @Created: 2/19/2022
 @Description: Unit testing for Text-to-Speech interface.

 @Changelog:
 2/19/2022 IS:Added constructor test
 */
const T2STest = require('../src/t2s');
/*
Tests for text to speech module will go here
 */

// eslint-disable-next-line no-undef
// test('Discord constructor', () => {
// 	const text2speech = new T2S();
// 	// eslint-disable-next-line no-undef
// 	expect(text2speech).toBeDefined();
// });

test('T2S test constructor', () => {
	const t2s = new T2STest('test');
	expect(t2s).toBeDefined();
});