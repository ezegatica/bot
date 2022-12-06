import { REST, Routes } from 'discord.js';
import config from './config';

const commands = [
  {
    name: 'ping',
    description: 'Replies with Pong!'
  }
];

const rest = new REST({ version: '10' }).setToken(config.TOKEN);

(async () => {
  try {
    console.info('Started refreshing application (/) commands.');

    await rest.put(Routes.applicationCommands(config.CLIENT_ID), {
      body: commands
    });

    console.info('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();
