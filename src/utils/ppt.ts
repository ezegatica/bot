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

export const getPlayReply = (
  interaction: ButtonInteraction | ChatInputCommandInteraction,
  tipo: 'solo' | 'duo'
): {
  embeds: EmbedBuilder[];
  components: Array<ActionRowBuilder<ButtonBuilder>>;
} => {
  const embed = new EmbedBuilder()
    .setAuthor({
      name:
        tipo === 'solo'
          ? `${interaction.user.username} vs ${interaction.guild.client.user.username}`
          : interaction.user.tag,
      iconURL: interaction.user.displayAvatarURL()
    })
    .setTitle('Piedra Papel o Tijera')
    .setDescription('Selecciona una opción');
  return {
    embeds: [embed],
    components: [botonElecciones(tipo)]
  };
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
  init?: ButtonInteraction
): Promise<GameData> => {
  const rawData = await db.get(id);
  if (!rawData) {
    if (init) {
      await initGame(
        id,
        {
          username: init.user.username,
          id: init.user.id
        },
        {
          username: init.client.user.username,
          id: init.client.user.id
        }
      );
      return getGame(id);
    }
    return {
      expired: true,
      player1: {
        id: '',
        username: '',
        score: 0
      },
      player2: {
        id: '',
        username: '',
        score: 0
      }
    };
  }
  return JSON.parse(rawData);
};

interface Player {
  username: string;
  id: string;
  score: number;
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

export const deleteGame = async (id: string): Promise<void> => {
  await db.delete(id);
};

export const gameGuard = async (
  gameData: GameData,
  interaction: ButtonInteraction
): Promise<Message<any>> => {
  if (gameData.player1.id !== interaction.user.id) {
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
