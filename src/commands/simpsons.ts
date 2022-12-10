import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import MensajesSimpsons from '../utils/simpsons';

module.exports = {
  data: new SlashCommandBuilder()
    .setName('simpsons')
    .setDescription('Frases de los simpsons')
    .addSubcommand(subcommand =>
      subcommand.setName('sugerir').setDescription('¿Queres sugerir una frase?')
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('random')
        .setDescription('Envia una frase de los simpsons')
    ),
  async execute(interaction: ChatInputCommandInteraction) {
    if (interaction.options.getSubcommand() === 'sugerir') {
      await interaction.reply({
        content:
          'Gracias por la sugerencia! Por favor, agregala aqui:\nhttps://github.com/ezegatica/bot/edit/main/src/utils/simpsons.ts',
        ephemeral: true
      });
      return;
    }
    const messages = MensajesSimpsons;
    const randomNumber = Math.floor(Math.random() * messages.length);
    const randomMessage = messages[randomNumber];
    await interaction.reply(
      `> ${randomMessage.quote}\n- ${randomMessage.author}`
    );
  }
};
