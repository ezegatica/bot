import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';

export const botonUnirse = new ActionRowBuilder<ButtonBuilder>().addComponents(
  new ButtonBuilder()
    .setLabel('Unirse')
    .setStyle(ButtonStyle.Success)
    .setCustomId('ppt:join')
);

export const botonElecciones =
  new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setLabel('Piedra')
      .setStyle(ButtonStyle.Primary)
      .setCustomId('ppt:rock'),
    new ButtonBuilder()
      .setLabel('Papel')
      .setStyle(ButtonStyle.Primary)
      .setCustomId('ppt:paper'),
    new ButtonBuilder()
      .setLabel('Tijera')
      .setStyle(ButtonStyle.Primary)
      .setCustomId('ppt:scissors')
  );
