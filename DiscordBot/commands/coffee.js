const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('coffee')
		.setDescription('Replies with beans!'),
	async execute(interaction) {
		await interaction.reply('beans!');
	},
};