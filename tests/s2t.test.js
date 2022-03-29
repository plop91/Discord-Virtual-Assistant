/**
 @Project:Discord Virtual Assistant
 @Title: s2t_test.js
 @Authors: Ian Sodersjerna, Jacob Austin, Jonathan Tucker, Nick Miceli
 @Created: 2/19/2022
 @Description: Unit testing for Speech-to-Text interface.

 @Changelog:
 3/29/2022 JT:Added more tests
 3/29/2022 JT:Changed tests to wav format
 3/21/2022 JT:Added await to some tests
 3/20/2022 JT:Changed tests to opus format
 3/16/2022 JT:Added audio tests
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

test('S2T "Hey Discord bot"', async () => {
    const speech2text = new S2T();
    const result = await speech2text.transcribe("./tests/resources/s2tTestAudio1.wav");
    expect(result).toEqual("hey Discord bot");
});

test('S2T "Whats the weather like today"', async () => {
    const speech2text = new S2T();
    const result = await speech2text.transcribe("./tests/resources/s2tTestAudio2.wav");
    expect(result).toEqual("what's the weather like today");
});

test('S2T "What time is the basketball game today"', async () => {
    const speech2text = new S2T();
    const result = await speech2text.transcribe("./tests/resources/s2tTestAudio3.wav");
    expect(result).toEqual("what time is the basketball game today");
});

test('S2T "What restaurants are near me"', async () => {
    const speech2text = new S2T();
    const result = await speech2text.transcribe("./tests/resources/s2tTestAudio4.wav");
    expect(result).toEqual("what restaurants are near me");
});

test('S2T "Hey Discord bot, play some music"', async () => {
    const speech2text = new S2T();
    const result = await speech2text.transcribe("./tests/resources/s2tTestAudio5.wav");
    expect(result).toEqual("hey Discord bot play some music");
});

test('S2T "Hey Discord bot, are there any sporting events near me today"', async () => {
    const speech2text = new S2T();
    const result = await speech2text.transcribe("./tests/resources/s2tTestAudio6.wav");
    expect(result).toEqual("hey Discord bot are there any sporting events near me today");
});