import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ayuda')
    .setDescription('Muestra los comandos disponibles'),
  async execute(interaction: ChatInputCommandInteraction) {
    return interaction.reply({
      embeds: [
        {
          author: {
            name: 'by: Gati#2615',
            icon_url:
              'https://gatica.sirv.com/public/Mapache%20Mundialista%20(1).png',
            url: 'https://ezegatica.com'
          },
          color: 1316897, // #141821 from hex to int
          description: 'Lista de comandos disponibles',
          title: 'Gati-bot',
          fields: [
            {
              name: '/ping',
              value: 'Revisa el ping que esta teniendo el bot actualmente',
              inline: true
            },
            {
              name: '/codigo',
              value: 'Te muestro el codigo fuente del bot',
              inline: true
            },
            {
              name: '/simpsons frase',
              value: 'Tira una frase random de Los Simpsons',
              inline: true
            }
          ],
          footer: {
            text: 'Made with love, by Gati',
            icon_url:
              'https://1.bp.blogspot.com/-44b7Xv4InJ4/T3MWo-ZkR2I/AAAAAAAACao/m7gU8rwq9TU/s1600/Ronda_Heart7.png'
          }
        }
      ],
      ephemeral: true
    });
  }
};
