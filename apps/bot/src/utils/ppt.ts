import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonInteraction,
  ButtonStyle,
  ChatInputCommandInteraction,
  EmbedBuilder,
  Message
} from 'discord.js';
import { db } from './db';

export const getSoloPlayReply = (
  interaction: ButtonInteraction | ChatInputCommandInteraction
): {
  embeds: EmbedBuilder[];
  components: Array<ActionRowBuilder<ButtonBuilder>>;
} => {
  const embed = new EmbedBuilder()
    .setAuthor({
      name: `${interaction.user.username} vs ${interaction.guild.client.user.username}`,
      iconURL: interaction.user.displayAvatarURL()
    })
    .setTitle('Piedra Papel o Tijera')
    .setDescription('Selecciona una opción');
  return {
    embeds: [embed],
    components: [botonElecciones('solo')]
  };
};

export const getDuoPlayReply = (
  gameData?: GameData
): {
  embeds: EmbedBuilder[];
  components: Array<ActionRowBuilder<ButtonBuilder>>;
} => {
  const embed = new EmbedBuilder()
    .setAuthor({
      name: `${
        gameData
          ? `${gameData.player1.username || 'Player ?'} vs ${
              gameData.player2.username || 'Player ?'
            }`
          : 'Player 1 vs Player 2'
      }`
    })
    .setTitle('Piedra Papel o Tijera');
  if (gameData) {
    if (gameData.player1.joined) {
      if (gameData.player2.joined) {
        embed
          .setDescription('Seleccionen una opcion!')
          .addFields([
            {
              name: 'Jugadores',
              value: '2/2',
              inline: true
            },
            {
              name: 'Jugador 1',
              value: gameData.player1.username,
              inline: true
            },
            {
              name: 'Jugador 2',
              value: gameData.player2.username,
              inline: true
            }
          ])
          .setFooter({
            text: `${gameData.player1.username} (${gameData.player1.score}) vs ${gameData.player2.username} (${gameData.player2.score})`
          });
        return {
          embeds: [embed],
          components: [botonElecciones('duo')]
        };
      } else {
        embed.setDescription('Esperando un jugador mas...').addFields([
          {
            name: 'Jugadores',
            value: '1/2',
            inline: true
          },
          {
            name: 'Jugador 1',
            value: gameData.player1.username,
            inline: true
          }
        ]);
        return {
          embeds: [embed],
          components: [botonUnirse]
        };
      }
    }
  } else {
    embed.setDescription('Esperando a que alguien se una...').addFields([
      {
        name: 'Jugadores',
        value: '0/2',
        inline: true
      }
    ]);
    return {
      embeds: [embed],
      components: [botonUnirse]
    };
  }
};

export const botonUnirse = new ActionRowBuilder<ButtonBuilder>().addComponents(
  new ButtonBuilder()
    .setLabel('Unirse')
    .setStyle(ButtonStyle.Success)
    .setCustomId('ppt:join')
);

export const botonJugarDenuevo =
  new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setLabel('Jugar de nuevo')
      .setStyle(ButtonStyle.Primary)
      .setCustomId('ppt:playagainsolo')
  );

export const botonDejarDeJugar =
  new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setLabel('Terminar juego')
      .setStyle(ButtonStyle.Danger)
      .setCustomId('ppt:stopgamesolo')
  );

export const botonElecciones = (
  tipo: 'solo' | 'duo'
): ActionRowBuilder<ButtonBuilder> =>
  new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setLabel(getName('rock'))
      .setStyle(ButtonStyle.Secondary)
      .setCustomId(`ppt:${tipo}:rock`),
    new ButtonBuilder()
      .setLabel(getName('paper'))
      .setStyle(ButtonStyle.Secondary)
      .setCustomId(`ppt:${tipo}:paper`),
    new ButtonBuilder()
      .setLabel(getName('scissors'))
      .setStyle(ButtonStyle.Secondary)
      .setCustomId(`ppt:${tipo}:scissors`)
  );

export const getName = (id: string): string => {
  switch (id) {
    case 'rock':
      return 'Piedra 👊';
    case 'paper':
      return 'Papel ✋';
    case 'scissors':
      return 'Tijera ✌';
  }
};

export const consultarGanador = (
  firstSelection: string,
  secondSelection: string
): boolean => {
  return (
    (firstSelection === 'rock' && secondSelection === 'scissors') ||
    (firstSelection === 'paper' && secondSelection === 'rock') ||
    (firstSelection === 'scissors' && secondSelection === 'paper')
  );
};

const TTL = 60 * 60 * 6 * 1000;

export interface GameData {
  expired?: boolean;
  player1: Player;
  player2: Player;
}

export const getGame = async (
  id: string,
  init?: ButtonInteraction,
  duo?: boolean
): Promise<GameData> => {
  const rawData = await db.get(id);
  if (!rawData) {
    if (init) {
      await initGame(
        id,
        {
          username: duo ? null : init.user.username,
          id: duo ? null : init.user.id,
          joined: duo ? false : true
        },
        {
          username: duo ? null : init.client.user.username,
          id: duo ? null : init.client.user.id,
          joined: duo ? false : true
        }
      );
      return getGame(id);
    }
    return {
      expired: true,
      player1: {
        id: '',
        username: '',
        joined: false,
        score: 0
      },
      player2: {
        id: '',
        username: '',
        joined: false,
        score: 0
      }
    };
  }
  return JSON.parse(rawData);
};

interface Player {
  username: string;
  id: string;
  joined: boolean;
  score: number;
  selection?: string;
}

export const initGame = async (
  id: string,
  player1: Omit<Player, 'score'>,
  player2: Omit<Player, 'score'>
): Promise<void> => {
  const gameData: GameData = {
    player1: {
      ...player1,
      score: 0
    },
    player2: {
      ...player2,
      score: 0
    }
  };
  await db.set(id, JSON.stringify(gameData), TTL);
};

export const updateGame = async (
  id: string,
  increasePlayer1Score: boolean,
  increasePlayer2Score: boolean
): Promise<void> => {
  const gameData = await getGame(id);
  if (increasePlayer1Score) {
    gameData.player1.score++;
  }
  if (increasePlayer2Score) {
    gameData.player2.score++;
  }
  await db.set(id, JSON.stringify(gameData), TTL);
};

export const setGame = async (
  id: string,
  gameData: GameData
): Promise<void> => {
  await db.set(id, JSON.stringify(gameData), TTL);
};

export const deleteGame = async (id: string): Promise<void> => {
  await db.delete(id);
};

export const gameGuard = async (
  gameData: GameData,
  interaction: ButtonInteraction
): Promise<Message<any>> => {
  if (
    gameData.player1.id !== interaction.user.id &&
    gameData.player2.id !== interaction.user.id
  ) {
    if (gameData.expired) {
      const msg = await interaction.fetchReply();
      await msg.edit({
        embeds: [
          new EmbedBuilder()
            .setTitle('Piedra Papel o Tijera')
            .setDescription('Juego terminado!')
            .setAuthor({
              name: msg.embeds[0].author.name,
              iconURL: msg.embeds[0].author.iconURL
            })
            .addFields([
              {
                name: 'Resultado',
                value: msg.embeds[0].footer.text
              }
            ])
        ],
        components: []
      });
      return interaction.followUp({
        content: 'Esta partida ya expiró!',
        ephemeral: true
      });
    }
    return interaction.followUp({
      content: 'No puedes interactuar con una partida que no iniciaste!',
      ephemeral: true
    });
  }
};

export const resetGame = async (
  gameData: GameData,
  id: string
): Promise<void> => {
  gameData.player1.selection = undefined;
  gameData.player2.selection = undefined;
  await setGame(id, gameData);
};
