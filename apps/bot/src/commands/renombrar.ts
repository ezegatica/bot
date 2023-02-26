import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';

module.exports = {
  data: new SlashCommandBuilder()
    .setName('renombrar')
    .setDescription('Renombra temporalmente a una persona')
    .addUserOption(option =>
      option
        .setName('usuario')
        .setDescription('El usuario a renombrar')
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName('nuevo_nombre')
        .setDescription('El nuevo nombre del usuario')
        .setRequired(true)
    )
    .setDefaultMemberPermissions('1099914280992'), // 1099511627776 + 134217728 + 268435456 + 32
  async execute(interaction: ChatInputCommandInteraction) {
    await interaction.deferReply();
    const usuario = interaction.options.getUser('usuario');
    const nuevo_nombre = interaction.options.getString('nuevo_nombre');
    const guild_member = await interaction.guild.members.fetch(usuario.id);
    const nombre_viejo = JSON.parse(
      JSON.stringify({ nombre: guild_member.nickname })
    ).nombre;
    await guild_member.setNickname(nuevo_nombre);
    await new Promise(resolve => setTimeout(resolve, 10000));
    await guild_member.setNickname(nombre_viejo);
    return interaction.editReply('Hecho!');
  }
};
