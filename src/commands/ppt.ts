import {
  ButtonInteraction,
  ChatInputCommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder
} from 'discord.js';
import { botonElecciones, botonUnirse } from '../utils/ppt';

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ppt')
    .setDescription('Jugar una partida de Piedra Papel o Tijera')
    .addSubcommand(subcommand =>
      subcommand.setName('solo').setDescription('Jugar solo contra la mega-IA!')
    )
    .addSubcommand(subcommand =>
      subcommand.setName('duo').setDescription('Jugar contra un amigo!')
    ),
  async execute(interaction: ChatInputCommandInteraction) {
    await interaction.deferReply();
    const embed = new EmbedBuilder()
      .setAuthor({
        name: interaction.user.tag,
        iconURL: interaction.user.displayAvatarURL()
      })
      .setDescription('Unirse a la partida');
    await interaction.editReply({
      embeds: [embed],
      components: [botonUnirse]
    });
  },
  async buttonExecute(interaction: ButtonInteraction) {
    // const extraOptions = interaction.customId.split(':')[2];
    switch (interaction.customId.split(':')[1]) {
      case 'join': {
        await interaction.deferUpdate();

        const embed = new EmbedBuilder()
          .setAuthor({
            name: interaction.user.tag,
            iconURL: interaction.user.displayAvatarURL()
          })
          .setDescription('Selecciona una opción');
        return interaction.editReply({
          embeds: [embed],
          components: [botonElecciones]
        });
      }
      default:
        return interaction.reply({
          content: 'No se reconoce el comando!',
          ephemeral: true
        });
    }
  }
};
