// Require the necessary discord.js classes
const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./config.json');
const mongoose = require('mongoose')
const morgan = require('morgan')
const axios = require('axios')
const RedditPost = require('./models/redditPost')

const dbURI = 'mongodb+srv://webCrawler:Taekwondo2021@cluster0.jkwzw.mongodb.net/redditPosts?retryWrites=true&w=majority'

mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(res => {/*console.log(res)*/})
.catch( err => console.log(err))

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
});

//Providing info on command
client.on('interactionCreate', async interaction => {

	//post request here
	// const redditPost = new RedditPost({url: redditLink})
		redditPost.save()
	

	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);
	console.log(command)

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

// Log the bot into Discord
client.login(token);

