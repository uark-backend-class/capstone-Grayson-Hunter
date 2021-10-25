const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios')

let redditLink = ''
axios.get('https://www.reddit.com/r/fitness/hot.json?limit=4')
.then(res => {
    redditLink = res.data.data.children[2].data.url
    // console.log(redditLink)
})
.catch(err => {
    console.log(err)
})

module.exports = {
	data: new SlashCommandBuilder()
		.setName('reddit')
		.setDescription('reddit link'),
	async execute(interaction) {
		await interaction.reply(redditLink);
	},
};