import { REST, Routes } from 'discord.js';
import fs from 'fs';
import path from 'path';
import config from './config';
import Logger from './logger';

// Construct and prepare an instance of the REST module
const rest = new REST({ version: '10' }).setToken(config.TOKEN);

// and deploy your commands!
(async () => {
  try {
    const commands = [];
    // Grab all the command files from the commands directory you created earlier
    const commandFiles = fs.readdirSync(path.join(__dirname, './commands'));

    // Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
    for (const file of commandFiles) {
      const command = await import(`./commands/${file}`);
      commands.push(command.data.toJSON());
    }

    Logger.info(
      `Started refreshing ${commands.length} application (/) commands.`
    );

    // The put method is used to fully refresh all commands with the current set
    const data: any = await rest.put(
      Routes.applicationCommands(config.CLIENT_ID),
      {
        body: commands
      }
    );

    Logger.info(
      `Successfully reloaded ${data.length} application (/) commands.`
    );
  } catch (error) {
    // And of course, make sure you catch and log any errors!
    Logger.error('Error al cargar los comandos');
    console.error(error);
  }
})();
