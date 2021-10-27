const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios')

//&t= for hour, week, month

function createRedditLink (){let redditLink = ''
	return axios.get('https://www.reddit.com/r/fitness/hot.json?limit=20&t=month')
	.then(res => {
		let randomIndex = Math.floor(Math.random() * 19);
		if (res.data && res.data.data && res.data.data.children[randomIndex] && res.data.data.children[randomIndex].data && res.data.data.children[randomIndex].data.url){
			return res.data.data.children[randomIndex].data.url;
		}
		else {
			console.log("Article not Found!");
			 return createRedditLink();
		}
		
	})
	.catch(err => {
		console.log(err)
	})
}
module.exports = {
	data: new SlashCommandBuilder()
		.setName('fit')
		.setDescription('fitness link'),
	async execute(interaction) {
		await interaction.reply(await createRedditLink());
	},
};