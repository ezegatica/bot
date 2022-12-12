import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonInteraction,
  ButtonStyle,
  ChatInputCommandInteraction,
  EmbedBuilder
} from 'discord.js';

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
          ? `${interaction.user.username} vs Gati Bot`
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
