/**
 @Project:Discord Virtual Assistant
 @Title: discord.js
 @Authors: Ian Sodersjerna, Jacob Austin, Jonathan Tucker, Nick Miceli
 @Created: 2/19/2022
 @Description: Interface with discord API

 @Changelog:
2/19/2022 IS:
 */

const Discord = require('discord.js');
const fs = require('fs');

class DiscordHandlerGeneric{
    constructor(token) {
        this.token = token;
    }
    get audio_clip(){
        // return loaded audio clip
        return null
    }
}

class DiscordHandler extends DiscordHandlerGeneric{
    constructor(token) {
        super(token);
        // Discord API client object
        this.client = new Discord.Client();
        // voice connection defaulted to null
        this.connection = null;
        this.audio_ready = false;
        //message handling function
        this.client.on('message', async message => {

            console.log(message.author.username + ": " + message.content);

            if (message.content === "join") {
                // Join the same voice channel of the author of the message
                if (message.member.voice.channel) {
                    this.connection = await message.member.voice.channel.join();
                } else {
                    message.channel.send("You are not connected to a server");
                }
            }else if (message.content === "record"){
                if(!this.connection){
                    if (message.member.voice.channel) {
                        this.connection = await message.member.voice.channel.join();
                    } else {
                        message.channel.send("You are not connected to a server");
                        return
                    }
                }
                //create a recorder object
                const audio = this.connection.receiver.createStream(message.author, {mode: 'pcm'});
                //save audio stream, refer to https://v12.discordjs.guide/voice/receiving-audio.html#basic-usage for playback information
                audio.pipe(fs.createWriteStream('user_audio'));
                this.audio_ready = true;
            }
        });

        this.client.once('ready', () => {
            console.log('Ready!');
        });

        this.client.login(this.token);
    }

    get audio_clip(){
        // return loaded audio clip
        return null
    }
}

class DiscordHandlerTest extends DiscordHandlerGeneric{
    constructor() {
        super();
    }
    get audio_clip(){
        // return test audio clip
        return null
    }

}
module.exports = DiscordHandler;