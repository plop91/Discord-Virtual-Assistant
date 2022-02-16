// Require the necessary discord.js classes
const { Client, Intents } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');
const { token } = require('./config.json');

let connection;

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	if (interaction.commandName === 'ping') {
		await interaction.reply('Pong!!');
	}
	if (interaction.commandName === 'join') {
		await interaction.reply('joining');
		const channel = interaction.member.voice.channel;
		connection = joinVoiceChannel({
			channelId: channel.id,
			guildId: channel.guild.id,
			adapterCreator: channel.guild.voiceAdapterCreator,
		});
		console.log(connection);
	}
	if (interaction.commandName === 'leave') {
		connection.destroy();
	}
});

// Login to Discord with your client's token
client.login(token)
	.then(() => console.log('App starting'))
	.catch(console.error);