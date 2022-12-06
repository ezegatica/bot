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
    name: Commands.Codigo,
    description: 'Responde con el link del codigo fuente del bot!'
  },
  {
    name: Commands.Simpsons,
    description: 'Frases de Los Simpsons!',
    options: [
      {
        name: 'random',
        description: 'Envia una frase de los simpsons',
        type: 1
      },
      {
        name: 'surgerir',
        description: '¿Queres sugerir una frase?',
        type: 1
        // required: false,
        // options: [
        //   {
        //     name: 'frase',
        //     description: 'Frase a sugerir',
        //     type: 3,
        //     required: true
        //   },
        //   {
        //     name: 'autor',
        //     description: 'Autor de la frase',
        //     type: 3,
        //     required: true
        //   }
        // ]
      }
    ]
  },
  {
    name: Commands.Clear,
    description:
      'Limpia el chat de mensajes! Puedes especificar la cantidad de mensajes a eliminar!',
    options: [
      {
        name: 'amount',
        description: 'Cantidad de mensajes a eliminar',
        type: 4,
        required: true,
        min_value: 0,
        max_value: 100
      }
    ],
    default_membdeer_permissions: 32 + 16 + 8192
  },
  {
    name: Commands.Gati,
    description: 'Quick access command!'
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
