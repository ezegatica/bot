import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';

module.exports = {
  data: new SlashCommandBuilder()
    .setName('codigo')
    .setDescription('Responde con el codigo fuente del bot!'),
  async execute(interaction: ChatInputCommandInteraction) {
    return interaction.reply({
      content:
        'Chequea el codigo fuente acá!\nhttps://github.com/ezegatica/bot',
      ephemeral: true
    });
  }
};
