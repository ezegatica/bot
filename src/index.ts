import { Client, GatewayIntentBits } from 'discord.js';
import config from './config';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on('ready', () => {
  console.info(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'ping') {
    await interaction.reply('Pong!');
  }
});

client.login(config.TOKEN);
