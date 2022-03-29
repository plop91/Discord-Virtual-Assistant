/**
 @Project:Discord Virtual Assistant
 @Title: t2s_test.js
 @Authors: Ian Sodersjerna, Jacob Austin, Jonathan Tucker, Nick Miceli
 @Created: 2/19/2022
 @Description: Unit testing for Text-to-Speech interface.

 @Changelog:
 3/29/2022 NM:Added test for empty text and female audio content
 3/17/2022 NM:Added tests for matching and not matching audio
 2/19/2022 IS:Added constructor test
 */
const T2S = require('../src/t2s');
const fs = require('fs');
// eslint-disable-next-line no-undef
jest.useFakeTimers('legacy');
let text2Speech = undefined;

// eslint-disable-next-line no-undef
beforeAll(() => {
	text2Speech = new T2S();
});

// eslint-disable-next-line no-undef
test('T2S constructor', () => {
	// eslint-disable-next-line no-undef
	expect(text2Speech).toBeDefined();
});

// eslint-disable-next-line no-undef
test('Sythesize speech empty text', async () => {
	await text2Speech.convert('');
	const testString = text2Speech.lastAudioContent;
	// The buffer should be empty
	// eslint-disable-next-line no-undef
	expect(testString.length).toBe(0);
});

// eslint-disable-next-line no-undef
test('Synthesize speech match neutral voice', async () => {
	await text2Speech.convert('Sorry, I don\'t understand.');
	// These files contain the two possible audio contents of 'Sorry, I don't understand.'
	// that Google may return (being spoken in a neutral voice).
	const resString1 = fs.readFileSync('tests/resources/testAudioContent1.txt').toString();
	const resString2 = fs.readFileSync('tests/resources/testAudioContent2.txt').toString();
	const testString = text2Speech.lastAudioContent;
	// The audio content from google should match one of the known correct audio contents
	// eslint-disable-next-line no-undef
	expect(resString1.localeCompare(testString) === 0 || resString2.localeCompare(testString) === 0).toBe(true);
});

// eslint-disable-next-line no-undef
test('Synthesize speech no match neutral voice', async () => {
	await text2Speech.convert('Message sent.');
	// These files contain the two possible audio contents of 'Sorry, I don't understand.'
	// that Google may return (being spoken in a neutral voice).
	const resString1 = fs.readFileSync('tests/resources/testAudioContent1.txt').toString();
	const resString2 = fs.readFileSync('tests/resources/testAudioContent2.txt').toString();
	const testString = text2Speech.lastAudioContent;
	// The audio contents should not match (Convert was passed a different string)
	// eslint-disable-next-line no-undef
	expect(resString1.localeCompare(testString) === 0 || resString2.localeCompare(testString) === 0).toBe(false);
});

// eslint-disable-next-line no-undef
test('Synthesize speech no match female voice', async () => {
	await text2Speech.convert('Sorry, I don\'t understand.');
	// This file contains audio content of 'Sorry, I don't understand.' (being spoken in a female voice)
	const resString = fs.readFileSync('tests/resources/testAudioContent3.txt').toString();
	const testString = text2Speech.lastAudioContent;
	// The audio contents should not match (Convert uses neutral voice)
	// eslint-disable-next-line no-undef
	expect(resString.localeCompare(testString) === 0).toBe(false);
});