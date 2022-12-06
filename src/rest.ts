import { REST, Routes } from 'discord.js';
import config, { Commands } from './config';
import Logger from './logger';

const commands = [
  {
    name: Commands.Ping,
    description: 'Replies with Pong!'
  },
  {
    name: Commands.Ayuda,
    description: 'Responde con la lista de comandos disponibles!'
  },
  {
    name: Commands.Gati,
    description: '2nd command test!'
  }
];

const rest = new REST({ version: '10' }).setToken(config.TOKEN);

(async () => {
  try {
    Logger.info('Started refreshing application (/) commands.');

    await rest.put(Routes.applicationCommands(config.CLIENT_ID), {
      body: commands
    });

    Logger.info('Successfully reloaded application (/) commands.');
  } catch (error: any) {
    Logger.error(error.message);
  }
})();
