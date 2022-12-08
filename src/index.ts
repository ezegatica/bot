import { Client, GatewayIntentBits } from 'discord.js';
import MensajesSimpsons from './commands/simpsons';
import config, { Commands } from './config';
import Logger from './logger';
import './keep_alive';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on('ready', () => {
  Logger.done(`Logged in as ${client.user.tag}!`);
  client.user.setActivity('/ayuda para ver los comandos disponibles!');
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;
  Logger.message(
    interaction.user.tag,
    interaction.guild.name,
    `${interaction.commandName} ${interaction.options.data
      .map(
        option =>
          `[${option.name}:${
            option.options
              ? option.options
                  .map(ops => `{${ops.name}:${ops.value}}`)
                  .join(', ')
              : option.value
          }]`
      )
      .join(', ')}`
  );

  if (interaction.commandName === Commands.Ping) {
    await interaction.reply({
      content: 'Pong!',
      ephemeral: true
    });
  }

  if (interaction.commandName === Commands.Codigo) {
    await interaction.reply({
      content:
        'Chequea el codigo fuente acá!\nhttps://github.com/ezegatica/bot',
      ephemeral: true
    });
  }

  if (interaction.commandName === Commands.Clear) {
    const amount = interaction.options.getInteger('amount');
    await interaction.deferReply({ ephemeral: true });
    await interaction.channel.bulkDelete(amount);
    await interaction.editReply({
      content: `Se eliminaron ${amount} mensajes!`
    });
  }

  if (interaction.commandName === Commands.Simpsons) {
    if (interaction.options.getSubcommand() === 'surgerir') {
      await interaction.reply({
        content:
          'Gracias por la sugerencia! Por favor, agregala aqui:\nhttps://github.com/ezegatica/bot/edit/main/src/commands/simpsons.ts',
        ephemeral: true
      });
      return;
    }
    const messages = MensajesSimpsons;
    const randomNumber = Math.floor(Math.random() * messages.length);
    const randomMessage = messages[randomNumber];
    await interaction.reply(
      `> ${randomMessage.quote}\n- ${randomMessage.author}`
    );
  }

  if (interaction.commandName === Commands.Ayuda) {
    await interaction.reply({
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
});

client.login(config.TOKEN);
