import { Client, GatewayIntentBits } from 'discord.js';
import config, { Commands } from './config';
import Logger from './logger';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on('ready', () => {
  Logger.done(`Logged in as ${client.user.tag}!`);
  client.user.setActivity('!ayuda para ver los comandos disponibles!');
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;
  Logger.message(interaction.user.tag, interaction.commandName);

  if (interaction.commandName === Commands.Ping) {
    await interaction.reply('Pong!');
  }

  if (interaction.commandName === Commands.Gati) {
    await interaction.reply('2nd command test!');
  }

  if (interaction.commandName === Commands.Ayuda) {
    await interaction.reply({
      embeds: [
        {
          author: {
            name: 'by: Gati#2615'
          },
          color: 141821,
          title: 'Gati-bot',
          fields: [
            {
              name: '/ping',
              value: 'Revisa el ping que esta teniendo el bot actualmente',
              inline: true
            },
            {
              name: '/opino',
              value: 'Opina sobre vos',
              inline: true
            },
            {
              name: '!punteo',
              value: 'Te punteo',
              inline: true
            }
          ],
          footer: {
            text: 'Made with love, by Gati',
            icon_url:
              'https://1.bp.blogspot.com/-44b7Xv4InJ4/T3MWo-ZkR2I/AAAAAAAACao/m7gU8rwq9TU/s1600/Ronda_Heart7.png'
          }
        }
      ]
    });
  }
});

client.login(config.TOKEN);
