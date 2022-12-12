import { Client, Collection, GatewayIntentBits } from 'discord.js';
import fs from 'fs';
import path from 'path';
import config from './config';
import Logger from './logger';
import { Command } from './utils/types';

const client: Client<boolean> & {
  commands?: Collection<string, Command>;
} = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildVoiceStates
  ]
});
client.commands = new Collection<string, Command>();

client.on('ready', async () => {
  // Cargar comandos
  const commandsPath = path.join(__dirname, 'commands');
  const commandFiles = fs.readdirSync(commandsPath);

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = (await import(filePath)) as Command;
    client.commands.set(command.data.name, command);
  }

  // Iniciar bot
  Logger.done(`Logged in as ${client.user.tag}!`);
  client.user.setActivity('/ayuda para ver los comandos disponibles!');
  Logger.done(`${client.commands.size} comandos cargados!`);
});

client.on('interactionCreate', async interaction => {
  if (interaction.isButton()) {
    const handler = client.commands.get(interaction.customId.split(':')[0]); // Asi se llama el handler del comando, y podemos tener varios subcomandos/subbotones

    if (!handler) return;

    try {
      await handler.buttonExecute(interaction);
    } catch (error: any) {
      Logger.error(error.message);
      console.error(error.stack);
      await interaction.reply({
        content:
          'Hubo un error al ejecutar el handler!\nPor favor, intenta de nuevo. Si el error persiste, contacta a Gati#2615',
        ephemeral: true
      });
    }
    return;
  }
  if (interaction.isChatInputCommand()) {
    Logger.message(interaction);
    // Correr comandos
    const command = client.commands.get(interaction.commandName);

    try {
      await command.execute(interaction);
    } catch (error: any) {
      Logger.error(error.message);
      console.error(error.stack);
      await interaction.reply({
        content:
          'Hubo un error al ejecutar el comando!\nPor favor, intenta de nuevo. Si el error persiste, contacta a Gati#2615',
        ephemeral: true
      });
    }
  }
});

client.login(config.TOKEN);
