import {
  StreamType,
  createAudioPlayer,
  createAudioResource,
  joinVoiceChannel
} from '@discordjs/voice';
import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonInteraction,
  ButtonStyle,
  ChatInputCommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder
} from 'discord.js';
import { join } from 'path';

const Player = createAudioPlayer();
module.exports = {
  data: new SlashCommandBuilder()
    .setName('botonera')
    .setDescription('Botonera con sonidos!'),
  async execute(interaction: ChatInputCommandInteraction) {
    const embed = new EmbedBuilder()
      .setTitle('Botonera')
      .setDescription('Reproduce sonidos en el chat de voz');
    const botones = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder()
        .setLabel('Oh My Gawd')
        .setStyle(ButtonStyle.Secondary)
        .setCustomId('botonera:omg'),
      new ButtonBuilder()
        .setLabel('Cartoon')
        .setStyle(ButtonStyle.Secondary)
        .setCustomId('botonera:goofy'),
      new ButtonBuilder()
        .setLabel('Bruh')
        .setStyle(ButtonStyle.Secondary)
        .setCustomId('botonera:bruh'),
      new ButtonBuilder()
        .setLabel('Vine Boom')
        .setStyle(ButtonStyle.Secondary)
        .setCustomId('botonera:boom'),
      new ButtonBuilder()
        .setLabel('Baby Laugh')
        .setStyle(ButtonStyle.Secondary)
        .setCustomId('botonera:laugh')
    );
    const botones2 = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder()
        .setLabel('What the hell')
        .setStyle(ButtonStyle.Secondary)
        .setCustomId('botonera:wth')
    );
    return interaction.reply({
      embeds: [embed],
      components: [botones, botones2]
    });
  },
  async buttonExecute(interaction: ButtonInteraction) {
    const choice = interaction.customId.split(':')[1];
    await interaction.deferUpdate();
    const soundPath = join(process.cwd(), 'dist', 'assets', `${choice}.mp3`);
    const connection = joinVoiceChannel({
      channelId: '827652966759530608',
      guildId: interaction.guild.id,
      adapterCreator: interaction.guild.voiceAdapterCreator
    });
    connection.subscribe(Player);

    const resource = createAudioResource(soundPath, {
      inputType: StreamType.Arbitrary
    });

    Player.play(resource);
    return interaction.editReply({});
  }
};
