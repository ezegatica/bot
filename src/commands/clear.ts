import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';

module.exports = {
  data: new SlashCommandBuilder()
    .setName('clear')
    .setDescription(
      'Limpia el chat de mensajes! Puedes especificar la cantidad de mensajes a eliminar!'
    )
    .setDefaultMemberPermissions(32 + 16 + 8192)
    .addIntegerOption(option =>
      option
        .setName('amount')
        .setDescription('Cantidad de mensajes a eliminar')
        .setRequired(true)
        .setMinValue(0)
        .setMaxValue(100)
    ),
  async execute(interaction: ChatInputCommandInteraction) {
    const amount = interaction.options.getInteger('amount');
    await interaction.deferReply({ ephemeral: true });
    await interaction.channel.bulkDelete(amount);
    return interaction.editReply({
      content: `Se eliminaron ${amount} mensajes!`
    });
  }
};
