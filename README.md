# Discord-Virtual-Assistant

![javascript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black) 
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white) 
![Mariadb](https://img.shields.io/badge/MariaDB-4EA94B?style=for-the-badge&logo=mariadb&logoColor=white) 
![Markdown](https://img.shields.io/badge/Markdown-000000?style=for-the-badge&logo=markdown&logoColor=white)

![Maintained](https://img.shields.io/badge/Maintained%3F-yes-green.svg) 
![Licence](https://img.shields.io/github/license/plop91/Discord-Virtual-Assistant.svg) 
![Website](https://img.shields.io/website-up-down-green-red/https/plop91.github.io/Discord-Virtual-Assistant/) 
![Downloads](https://img.shields.io/github/downloads/plop91/Discord-Virtual-Assistant/total.svg)

## Authors

| Author                                            | Link                                                                                                                                                                                      | 
|---------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------| 
| [Ian Sodersjerna](https://github.com/plop91)      | [![Follow](https://img.shields.io/github/followers/plop91.svg?style=social&label=Follow&maxAge=2592000)](https://github.com/login?return_to=https%3A%2F%2Fgithub.com%2Fplop91)            | 
| [Jacob Austin](https://github.com/jacob-austin)   | [![Follow](https://img.shields.io/github/followers/jacob-austin.svg?style=social&label=Follow&maxAge=2592000)](https://github.com/login?return_to=https%3A%2F%2Fgithub.com%2FJTucker2000) | 
| [Jonathan Tucker](https://github.com/JTucker2000) | [![Follow](https://img.shields.io/github/followers/JTucker2000.svg?style=social&label=Follow&maxAge=2592000)](https://github.com/login?return_to=https%3A%2F%2Fgithub.com%2Fjacob-austin) |
| [Nick Miceli](https://github.com/nickmiceli4)     | [![Follow](https://img.shields.io/github/followers/nickmiceli4.svg?style=social&label=Follow&maxAge=2592000)](https://github.com/login?return_to=https%3A%2F%2Fgithub.com%2Fnickmiceli4)  |


## Instructions

### Installation:

Discord Virtual Assistant requires several external components to install and run including a node.js, ffmpeg and a maria database in order to run.

* if you do not have node.js it can be installed from [these instructions](https://nodejs.org/en/download/) first then complete these steps
* if you do not have ffmpeg it can be installed from [their website](https://ffmpeg.org/download.html)
* if you do not have mariadb installed follow [these instructions](https://mariadb.com/get-started-with-mariadb/) or contact databases@sodersjerna.com for access to existing database. 
* instructions for creating a discord bot token can be found [here](https://www.writebots.com/discord-bot-token/)


1. Download code to "DISCORD\_VIRTUAL\_ASSISTANT\_DIR" (replace "DISCORD\_VIRTUAL\_ASSISTANT\_DIR" with desired folder name)

```
git clone https://github.com/plop91/Discord-Virtual-Assistant.git DISCORD_VIRTUAL_ASSISTANT_DIR
```

2. Change to downloaded directory

```
cd DISCORD_VIRTUAL_ASSISTANT_DIR
```

3. Install dependencies

```
npm update -g npm
npm install
```

4. Set your Discord bot token as an environmental variable.

```
export DISCORD_TOKEN=YOUR_DISCORD_TOKEN # commands may vary per operating system
```

5. Set your maria db credentials as an environmental variable.

```
export DVA_DATABASE_HOST=hostname/ip
export DVA_DATABASE_USER=username
export DVA_DATABASE_PASSWORD=password
```

### Usage:

1. Change to downloaded directory

```
cd DISCORD_VIRTUAL_ASSISTANT_DIR
```

2. Start the node application

```
npm start
```

3. Join a voice channel in a server that the bot is a member of and type 'join' in a text channel to have the bot join your audio channel (instructions to invite a bot can be found [here](https://discordpy.readthedocs.io/en/stable/discord.html))
4. type 'record' to make the bot begin recording audio.
5. after you have finished speaking the bot will respond in the audio channel.

### Testing:

1. Change to downloaded directory

```
cd DISCORD_VIRTUAL_ASSISTANT_DIR
```

2. Start the tests for the node application

```
npm test
```

## Objectives

This project seeks to solve that Discord currently lacks any built-in virtual assistant to help users with their daily interactions with the app; therefore, the objective for Discord Virtual Assistant is to create a Discord bot that users can interact with similarly to how people interact with Google Home or Amazon Alexa. Users of our Discord Virtual Assistant will communicate with it through a voice channel within a Discord Server. The bot will perform a task based on what is asked of it and reply back through the voice channel with either an answer to a question or acknowledgement of a command. In regards to the features our Discord Virtual Assistant will support, it will support typical features that other virtual assistants can such as stating the time, weather, and starting a timer. On top of these features, we will also be supporting more Discord-specific features such as messaging other members in a server and recording audio in a voice channel.

## Current Practice

Currently, the main alternative to Discord Virtual Assistant would be the typical virtual assistants on the market such as Google assistant, Amazon Alexa, or Siri. While these are all viable options, the features they offer do not interact with Discord. With Discord being a common tool used for both gaming and school, a virtual assistant that can help users streamline the way in which they interact with it would be a welcomed addition to the market. In the realm of Discord bots, there are some virtual assistants out there such as Google Assistant Discord bot or SUSI.AI. However, they are limited in their abilities. Mainly, users interact with these bots using messages in a channel rather than being able to use voice commands to control the bot like Discord Virtual Assistant aims to do. Also, the features that they support are akin to traditional virtual assistants (Google Assistant, Alexa, etc.) in that they do not help users interact with Discord. They are virtual assistants within Discord, which our Assistant will build off of by being a virtual assistant for Discord.

## Our approach

The idea of a virtual assistant is nothing new, however, we are applying it to a new platform which has never seen any kind of virtual assistant support in the past. The approach relies on layering several API’s in order to get the desired virtual assistant. Firstly, and most importantly, the discord.js API allows us to easily interact with the discord platform. The discord.js API gives us the ability to send and receive messages and audio while simultaneously granting full administration over the Discord server with functions such as banning users, inviting users, or creating webhooks. Once we have our interface with Discord setup, the next step will be to receive and process the audio clips returned from Discord. This should be straightforward as discord.js returns audio clips separated by “silence” (or when no one is speaking in the server) which works perfectly for this application. Once we have our audio clip we will upload it to the Google Speech-to-Text API which will return a transcript of the audio clip. Once we have the transcript of the audio we must parse the text looking for commands and their arguments. The parser will need to understand all potential commands and may in some cases need to wait for multiple audio files to be processed before it can perform an action. From here the bot begins performing an action which will usually begin with an audio response to the user. The audio response will be generated by the Google Text-to-Speech API using the text provided by the action. Once a response is rendered the virtual assistant will perform any additional functions contained in the action, such as sending a message, or banning a user.

# Interface

Our software will not have its own graphical user interface. Rather, users will interact with Discord’s GUI to use the bot. In order to interface with our bot specifically, users will join a Discord voice channel where the bot is present and they will speak commands in the channel directly to the bot. The way this works relies on the discord.js API, which provides functionality to record the audio in the voice channel as an audio file. This audio file can then be transcribed to text via any number of speech-to-text APIs, the current plan is to use Google Speech-to-Text. Once the audio is transcribed to text, the bot will have a parser which will scan through the text to look out for keywords and phrases that correspond to the commands the bot supports; then, the bot will act on the command it receives. If the command is to do something within Discord itself (send a message, ban a user, etc.), the bot will use discord.js to execute the requested task, but if the command is for something not Discord related (ask for the weather, time, etc) then the bot will execute it using other tools such as a weather API for weather data or JavaScript’s Date class for the time. Once the command has been executed the bot will put together a string to respond to the user. It will either contain the information the user requested or simply an acknowledgement that the command has executed if no information is requested. Once the string is constructed, Google Text-to-Speech will be used to get an audio file of the response being spoken and discord.js will be used to have the audio file played in the voice channel back to the user.

# Who cares?

Users of Discord would find our virtual assistant useful, since no alternatives exist that can directly interact with Discord. It will be able to have much more functionality within Discord than other virtual assistants. It could do things like message other Discord users, play music within a voice channel, or record the audio within a voice channel. The virtual assistant will take the form of a Discord bot, so it will also be able to take in voice commands from every user in the voice channel. Discord server administrators may also find the virtual assistant useful. You could map administrator commands to specific voice commands to save time. For example, you might say “Hey Discord bot, add a voice channel named general” or “Hey Discord bot, ban user1234”. The usefulness of the virtual assistant would depend on the administrator and what they do, but it certainly has potential as a time saving tool.

## Potential success

For the project to be considered a success, it must be able to process voice commands and provide some basic functionality through those commands. If the project ends up being successful in this way, it not only means we have built a decent bot; it also means we have created a great platform to build off of in the future. There are many features not included in our objective that could be added to a virtual assistant like this one. For example, we could add interaction between different apps and hardware. You may be able to say something like “Hey Discord bot, turn all of the lights in the bedroom green” or “Hey Discord bot, launch a random game on Steam”. If our project managed to be this successful, the Discord virtual assistant would be one of the best Discord bots available. It might even be a viable alternative to other virtual assistants like Siri or Google Assistant.

## Risks and payoffs

The main risk of this project has to do with its scope. There are endless possibilities for possible features to add, so it is important the team gets the core system functioning well before getting caught up in adding features, or else the risk could be a piece of software that has many things it should do but few things it actually does do. Sticking to the schedule and list of core features is essential to prevent feature creep. Another risk is the pricing of speech-to-text APIs. While the estimated cost is not extreme and it is unlikely that significantly more API calls are needed than what is estimated, all use of APIs must be documented and shared with the team to prevent excessive costs from being incurred. One more risk is that we are using several different APIs for this project, so there is always a risk that different APIs do not work well together and need extra development time to be properly modular. At the start of the project it would likely be wise to try several different speech-to-text APIs to see how they function with the necessary Discord API to prevent deadlock later in the project.

## Development costs

Most of the development cost for this project will come from the price of using pre-developed APIs. While the Discord API has a global rate limit for requests, there is no cost associated with use. There are many Speech-to-text APIs available for public use, with differing costs and pricing schemes. For most, a length of time is free either weekly or monthly, and additional time must be purchased. To create a cost estimate for this project, we will make a few assumptions and assertions: There are four (4) members of the development team The project will take three (3) months of development Each member will commit an average of ten (10) hours per week to the project An average of 25% of the work time will be used for API calls Assertions 1 and 2 will remain constant, but assertions 3 and 4 are estimated slightly above what will likely be needed to avoid underestimating cost. Using these numbers, we can estimate the total project cost for each API here: We can see the models vary in pricing strategy and costs. Google tops the pricing by a good margin, but boasts top-of-the-line accuracy, although the accuracy numbers of these models aren’t made public. IBM Watson also supports several languages and includes 500 monthly free minutes, with middle of the pack pricing for the researched models. AssemblyAI brings the cheapest per-hour pricing with three free hours monthly, but only supports English at the time of writing. Use of IBM Watson or AssemblyAI would help keep costs to around $100 total for the project, and no other expenses should be necessary.

## Measurements of success

As our project is so large in size there will need to be many specific goals set and met in order to complete the project within this semester, a sorted list follows showing checkpoints we must meet in the order they must be completed to have a working virtual assistant. Create a javascript application capable of interfacing with all required functions of Discord Send and receive messages from discord Send and receive audio from discord Administer the discord server Create interface between JavaScript application and the Google Speech-to-Text API (MIDTERM CHECKPOINT) - to include testing and documentation of currently written code Create a text parser with the ability to decipher and execute commands Create an interface between javascript application and Google Text-to-Speech API (FINAL CHECKPOINT) - to include testing,documentation and deployment of virtual assistant.

This list is subject to change, we will likely need to add additional steps however this is a good outline of the steps necessary to creating a Virtual assistant.

## Architecture Diagram

Insert Architecture Diagram here.

## Technologies

Insert Technologies here

## Roles

Insert who will be responsible for what

## Week-by-week schedule

Schedule is subject to change in the case of unknown circumstances.

* February 14 - February 18 Work on implementation and architecture plan Research JavaScript and Discord.js to figure out interaction between script and Discord (send and receive audio and text, administrate the server)
* February 21 - February 25 Finish implementation and architecture plan Begin writing and testing JavaScript code to get audio and messages from the server.
* February 28 - March 4 Finish implementation of JS to receive commands from Discord. Submit ‘Repository and begin implementation’ assignment Begin to interface between JS and google speech to text if time permits
* March 7 - March 11 (Spring Break) Interface between JS and google speech to text Prepare mid term presentation and practice if group can meet over break
* March 14 - March 18 Have JS and speech to text interface completed and tested. Practice and deliver presentation if time was not found over break Have testing and documentation for all code written thus far
* March 21 - March 25 Code parser to interpret speech to text results Add some possible commands for bot to act on Write code for text to speech to reply to user
* March 28 - April 1 Write JS to send response back to Discord Voice chat Continue adding features that users can command bot with
* April 4 - April 8 Polish Code (extra time in case of delays) Begin drafting final report
* April 11 - April 15 Submit final report draft
* April 18 - April 22 Prepare and practice final presentation Edit final report based on feedback from draft
* April 25 - April 29 Submit Finalized report Deliver presentation