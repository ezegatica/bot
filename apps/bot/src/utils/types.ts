import {
  ButtonInteraction,
  ChatInputCommandInteraction,
  SlashCommandBuilder
} from 'discord.js';

export interface Command {
  data: SlashCommandBuilder;
  execute: (interaction: ChatInputCommandInteraction) => Promise<void>;
  buttonExecute?: (interaction: ButtonInteraction) => Promise<void>;
}

export interface Handler {
  data: {
    name: string;
  };
  execute: (interaction: ButtonInteraction) => Promise<void>;
}
