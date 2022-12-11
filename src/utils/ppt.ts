import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';

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

export const botonElecciones = (
  tipo: 'solo' | 'duo'
): ActionRowBuilder<ButtonBuilder> =>
  new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setLabel('Piedra')
      .setStyle(ButtonStyle.Secondary)
      .setCustomId(`ppt:${tipo}:rock`),
    new ButtonBuilder()
      .setLabel('Papel')
      .setStyle(ButtonStyle.Secondary)
      .setCustomId(`ppt:${tipo}:paper`),
    new ButtonBuilder()
      .setLabel('Tijera')
      .setStyle(ButtonStyle.Secondary)
      .setCustomId(`ppt:${tipo}:scissors`)
  );

export const getName = (id: string): string => {
  switch (id) {
    case 'rock':
      return 'Piedra';
    case 'paper':
      return 'Papel';
    case 'scissors':
      return 'Tijera';
  }
};
