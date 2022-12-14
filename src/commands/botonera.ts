import {
  NoSubscriberBehavior,
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

const Player = createAudioPlayer({
  behaviors: {
    noSubscriber: NoSubscriberBehavior.Pause
  }
});
module.exports = {
  data: new SlashCommandBuilder()
    .setName('botonera')
    .setDescription('Botonera con sonidos!'),
  async execute(interaction: ChatInputCommandInteraction) {
    const embed = new EmbedBuilder()
      .setTitle('Botonera')
      .setDescription(
        '**Selecciona un sonido para reproducirlo!**\n(Tienes que estar en un canal de voz)'
      );
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
        .setCustomId('botonera:wth'),
      new ButtonBuilder()
        .setLabel('WinXP Startup')
        .setStyle(ButtonStyle.Secondary)
        .setCustomId('botonera:wxp2'),
      new ButtonBuilder()
        .setLabel('WinXP Shutdown')
        .setStyle(ButtonStyle.Secondary)
        .setCustomId('botonera:wxp1'),
      new ButtonBuilder()
        .setLabel('WinXP Error')
        .setStyle(ButtonStyle.Secondary)
        .setCustomId('botonera:wxp3')
    );
    const botones3 = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder()
        .setLabel('Samsung')
        .setStyle(ButtonStyle.Secondary)
        .setCustomId('botonera:samsung'),
      new ButtonBuilder()
        .setLabel('Ankara Messi')
        .setStyle(ButtonStyle.Secondary)
        .setCustomId('botonera:ankara'),
      new ButtonBuilder()
        .setLabel('Golgolgol')
        .setStyle(ButtonStyle.Secondary)
        .setCustomId('botonera:gol')
    );
    const controles = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder()
        .setLabel('Detener')
        .setStyle(ButtonStyle.Danger)
        .setCustomId('botonera:stop'),
      new ButtonBuilder()
        .setLabel('Andate')
        .setStyle(ButtonStyle.Primary)
        .setCustomId('botonera:leave')
    );
    return interaction.reply({
      embeds: [embed],
      components: [botones, botones2, botones3, controles]
    });
  },
  async buttonExecute(interaction: ButtonInteraction) {
    const i = await interaction.deferUpdate();
    const vcId = interaction.guild.members.cache.get(interaction.user.id).voice
      .channelId;
    if (!vcId) {
      return interaction.followUp({
        ephemeral: true,
        content: 'No estas en un canal de voz, unite y me uno!'
      });
    }
    const choice = interaction.customId.split(':')[1];
    if (choice === 'stop') {
      Player.stop();
      return i;
    }
    const connection = joinVoiceChannel({
      channelId: vcId,
      guildId: interaction.guild.id,
      adapterCreator: interaction.guild.voiceAdapterCreator
    });
    if (choice === 'leave') {
      Player.stop();
      connection.destroy();
      return i;
    }
    const soundPath = join(process.cwd(), 'dist', 'assets', `${choice}.mp3`);
    connection.subscribe(Player);

    const resource = createAudioResource(soundPath, {
      inputType: StreamType.Arbitrary
    });

    Player.play(resource);
    return i;
  }
};
