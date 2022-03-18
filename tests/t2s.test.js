/**
 @Project:Discord Virtual Assistant
 @Title: t2s_test.js
 @Authors: Ian Sodersjerna, Jacob Austin, Jonathan Tucker, Nick Miceli
 @Created: 2/19/2022
 @Description: Unit testing for Text-to-Speech interface.

 @Changelog:
 3/17/2022 NM:Added tests for matching and not matching audio
 2/19/2022 IS:Added constructor test
 */
const T2S = require('../src/t2s');
const fs = require('fs');
// eslint-disable-next-line no-undef
jest.useFakeTimers('legacy');


// eslint-disable-next-line no-undef
test('Synthesize speech match', async () => {
	const text2Speech = new T2S();
	await text2Speech.convert('Sorry, I don\'t understand.');
	const resBuffer = fs.readFileSync('tests/resources/testAudioContent1.txt');
	const testBuffer = text2Speech.lastAudioContent;
	// eslint-disable-next-line no-undef
	expect(Buffer.compare(resBuffer, testBuffer) == 0).toBe(true);
});

// eslint-disable-next-line no-undef
test('Synthesize speech no match', async () => {
	const text2Speech = new T2S();
	await text2Speech.convert('Message sent.');
	const resBuffer = fs.readFileSync('tests/resources/testAudioContent1.txt');
	const testBuffer = text2Speech.lastAudioContent;
	// eslint-disable-next-line no-undef
	expect(Buffer.compare(resBuffer, testBuffer) == 0).toBe(false);
});

// eslint-disable-next-line no-undef
test('T2S constructor', () => {
	const text2speech = new T2S();
	// eslint-disable-next-line no-undef
	expect(text2speech).toBeDefined();
});