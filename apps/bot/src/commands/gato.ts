import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import fetch from 'node-fetch';

module.exports = {
  data: new SlashCommandBuilder()
    .setName('gato')
    .setDescription('Envia una imagen de un gatito'),
  async execute(interaction: ChatInputCommandInteraction) {
    await interaction.deferReply();
    const catResult = await fetch('https://aws.random.cat/meow');
    const { file } = (await catResult.json()) as { file: string };
    return interaction.editReply({
      files: [{ attachment: file, name: 'cat.png' }]
    });
  }
};
