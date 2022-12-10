import {
  ChatInputCommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder
} from 'discord.js';
import fetch from 'node-fetch';

const trim = (str: any, max: any) =>
  str.length > max ? `${str.slice(0, max - 3)}...` : str;

module.exports = {
  data: new SlashCommandBuilder()
    .setName('definir')
    .setDescription('Definir usando Urban Dictionary')
    .addStringOption(option =>
      option
        .setName('term')
        .setDescription('La palabra a definir')
        .setRequired(true)
    ),
  async execute(interaction: ChatInputCommandInteraction) {
    await interaction.deferReply();
    const term = interaction.options.getString('term');
    const query = new URLSearchParams({ term });

    const dictResult = await fetch(
      `https://api.urbandictionary.com/v0/define?${query}`
    );
    const { list } = await dictResult.json();

    if (!list.length) {
      return interaction.editReply(`No results found for **${term}**.`);
    }

    const [answer] = list;

    const embed = new EmbedBuilder()
      .setColor(0xefff00)
      .setTitle(answer.word)
      .setURL(answer.permalink)
      .addFields(
        { name: 'Definition', value: trim(answer.definition, 1024) },
        { name: 'Example', value: trim(answer.example, 1024) },
        {
          name: 'Rating',
          value: `${answer.thumbs_up} thumbs up. ${answer.thumbs_down} thumbs down.`
        }
      );
    return interaction.editReply({ embeds: [embed] });
  }
};
