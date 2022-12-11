import {
  ButtonInteraction,
  ChatInputCommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder
} from 'discord.js';
import {
  botonElecciones,
  botonJugarDenuevo,
  botonUnirse,
  getName
} from '../utils/ppt';

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
    if (interaction.options.getSubcommand() === 'solo') {
      const embed = new EmbedBuilder()
        .setAuthor({
          name: interaction.user.tag,
          iconURL: interaction.user.displayAvatarURL()
        })
        .setTitle('Piedra Papel o Tijera')
        .setDescription('Selecciona una opción');
      return interaction.editReply({
        embeds: [embed],
        components: [botonElecciones('solo')]
      });
    }
    if (interaction.options.getSubcommand() === 'duo') {
      return interaction.editReply({
        content:
          'Esta función no está disponible todavía, prueba `/ppt solo` para jugar solo contra la mega-IA!'
      });
      const embed = new EmbedBuilder()
        .setAuthor({
          name: `${interaction.user.tag}`,
          iconURL: interaction.user.displayAvatarURL()
        })
        .setTitle('Piedra Papel o Tijera')
        .setDescription('Esperando a que alguien se una...')
        .addFields([
          {
            name: 'Jugadores',
            value: '1/2',
            inline: true
          }
        ]);
      return interaction.editReply({
        embeds: [embed],
        components: [botonUnirse]
      });
    }
    return interaction.editReply({
      content: 'No se como llegaste acá pero lo rompiste, felicitaciones'
    });
  },
  async buttonExecute(interaction: ButtonInteraction) {
    const userSelection = interaction.customId.split(':')[2] || undefined;
    await interaction.deferUpdate();
    switch (
      interaction.customId.split(':')[1] as
        | 'join'
        | 'duo'
        | 'solo'
        | 'playagainsolo'
    ) {
      case 'join': {
        const embed = new EmbedBuilder()
          .setAuthor({
            name: interaction.user.tag,
            iconURL: interaction.user.displayAvatarURL()
          })
          .setDescription('Selecciona una opción');
        return interaction.editReply({
          embeds: [embed],
          components: [botonElecciones('duo')]
        });
      }
      case 'solo': {
        const embed = new EmbedBuilder().setAuthor({
          name: `${interaction.user.username} vs Gati Bot`,
          iconURL: interaction.user.displayAvatarURL()
        });
        embed.setTitle(`Seleccionaste ${getName(userSelection)}`);
        const rng = Math.floor(Math.random() * 3);

        const botSelection = ['rock', 'paper', 'scissors'][rng];
        embed.setTitle('Piedra Papel o Tijera');
        embed.addFields({
          name: 'Elegiste',
          value: getName(userSelection),
          inline: true
        });
        embed.addFields({
          name: 'La IA eligió',
          value: getName(botSelection),
          inline: true
        });
        if (userSelection === botSelection) {
          embed.addFields({ name: 'Resultado', value: 'Empate' });
        } else if (
          (userSelection === 'rock' && botSelection === 'scissors') ||
          (userSelection === 'paper' && botSelection === 'rock') ||
          (userSelection === 'scissors' && botSelection === 'paper')
        ) {
          embed.addFields({ name: 'Resultado', value: 'Ganaste' });
        } else {
          embed.addFields({ name: 'Resultado', value: 'Perdiste' });
        }
        return interaction.editReply({
          embeds: [embed],
          components: [botonJugarDenuevo]
        });
      }

      case 'playagainsolo': {
        const embed = new EmbedBuilder()
          .setAuthor({
            name: interaction.user.tag,
            iconURL: interaction.user.displayAvatarURL()
          })
          .setTitle('Piedra Papel o Tijera')
          .setDescription('Selecciona una opción');
        return interaction.editReply({
          embeds: [embed],
          components: [botonElecciones('solo')]
        });
      }

      default:
        return interaction.editReply({
          content: 'No se reconoce el comando!'
        });
    }
  }
};
