import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';

module.exports = {
  data: new SlashCommandBuilder().setName('new').setDescription('new command'),
  async execute(interaction: ChatInputCommandInteraction) {
    return interaction.reply('reply');
  }
};
