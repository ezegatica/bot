import {
  ButtonInteraction,
  ChatInputCommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder
} from 'discord.js';
import {
  botonDejarDeJugar,
  botonJugarDenuevo,
  consultarGanador,
  deleteGame,
  gameGuard,
  getDuoPlayReply,
  getGame,
  getName,
  getSoloPlayReply,
  setGame,
  updateGame
} from '../utils/ppt';

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ppt')
    .setDescription('Jugar una partida de Piedra Papel o Tijera')
    .addSubcommand(subcommand =>
      subcommand.setName('solo').setDescription('Jugar solo contra la IA!')
    )
    .addSubcommand(subcommand =>
      subcommand.setName('duo').setDescription('(WIP): Jugar contra un amigo!')
    ),
  async execute(interaction: ChatInputCommandInteraction) {
    await interaction.deferReply();

    if (interaction.options.getSubcommand() === 'solo') {
      // Esto es como una base del mensaje, el solo esta para satisfacer al tipado
      return interaction.editReply(getSoloPlayReply(interaction));
    } else if (interaction.options.getSubcommand() === 'duo') {
      return interaction.editReply(getDuoPlayReply());
    } else {
      return interaction.editReply({
        content:
          'No se como, pero llegaste a un lugar donde no deberias haber llegado\nPartida cancelada!',
        embeds: []
      });
    }
  },
  async buttonExecute(interaction: ButtonInteraction) {
    const userSelection = interaction.customId.split(':')[2] || undefined;
    const gameID = interaction.message.id;
    const i = await interaction.deferUpdate();
    switch (
      interaction.customId.split(':')[1] as
        | 'join'
        | 'duo'
        | 'solo'
        | 'playagainsolo'
        | 'stopgamesolo'
    ) {
      case 'join': {
        const gameData = await getGame(gameID, interaction, true);
        if (!gameData.player1.joined) {
          gameData.player1 = {
            id: interaction.user.id,
            username: interaction.user.username,
            joined: true,
            score: 0
          };
          await setGame(gameID, gameData);
          return interaction.editReply(getDuoPlayReply(gameData));
        }
        if (!gameData.player2.joined) {
          if (gameData.player1.id === interaction.user.id) {
            return interaction.followUp({
              content: 'No puedes jugar contra vos mismo',
              ephemeral: true
            });
          }
          gameData.player2 = {
            id: interaction.user.id,
            username: interaction.user.username,
            joined: true,
            score: 0
          };
          await setGame(gameID, gameData);
          return interaction.editReply(getDuoPlayReply(gameData));
        }

        if (gameData.player1.joined && gameData.player2.joined) {
          return interaction.editReply(getDuoPlayReply(gameData));
        }

        return i;
      }
      case 'duo': {
        const gameData = await getGame(gameID, interaction);
        const guardRes = await gameGuard(gameData, interaction);
        if (guardRes) {
          return guardRes;
        }
        const videoUrl = 'https://gatica.sirv.com/public/simpsons.gif';
        return interaction.followUp({
          content: 'Hagamos de cuenta que estamos jugando',
          files: [{ attachment: videoUrl, name: 'imagination.gif' }]
        });
      }
      case 'solo': {
        const gameData = await getGame(gameID, interaction);
        const guardRes = await gameGuard(gameData, interaction);
        if (guardRes) {
          return guardRes;
        }
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
          embed.addFields({ name: 'Resultado', value: 'Empate 😐' });
          await updateGame(gameID, true, true);
        } else if (consultarGanador(userSelection, botSelection)) {
          embed.addFields({ name: 'Resultado', value: 'Ganaste 😁' });
          await updateGame(gameID, true, false);
        } else {
          embed.addFields({ name: 'Resultado', value: 'Perdiste 😢' });
          await updateGame(gameID, false, true);
        }
        const game = await getGame(gameID);
        embed.setFooter({
          text: `${game.player1.username} (${game.player1.score}) vs ${game.player2.username} (${game.player2.score})`
        });
        return interaction.editReply({
          embeds: [embed],
          components: [botonJugarDenuevo, botonDejarDeJugar]
        });
      }

      case 'playagainsolo': {
        const gameData = await getGame(gameID);
        const guardRes = await gameGuard(gameData, interaction);
        if (guardRes) {
          return guardRes;
        }
        return interaction.editReply(getSoloPlayReply(interaction));
      }

      case 'stopgamesolo': {
        const gameData = await getGame(gameID);
        const guardRes = await gameGuard(gameData, interaction);
        if (guardRes) {
          return guardRes;
        }
        const embed = new EmbedBuilder()
          .setAuthor({
            name: `${interaction.user.username} vs Gati Bot`,
            iconURL: interaction.user.displayAvatarURL()
          })
          .setTitle('Piedra Papel o Tijera')
          .setDescription('Juego terminado!')
          .addFields({
            name: 'Ganador',
            value:
              gameData.player1.score > gameData.player2.score
                ? gameData.player1.username
                : gameData.player1.score < gameData.player2.score
                ? gameData.player2.username
                : 'Empate!',
            inline: true
          })
          .setFooter({
            text: `${gameData.player1.username} (${gameData.player1.score}) vs ${gameData.player2.username} (${gameData.player2.score})`
          });
        await deleteGame(gameID);
        return interaction.editReply({
          embeds: [embed],
          components: []
        });
      }

      default:
        return interaction.followUp({
          ephemeral: true,
          content: 'No se reconoce el comando!'
        });
    }
  }
};
