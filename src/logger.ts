import chalk from 'chalk';
import { ButtonInteraction, ChatInputCommandInteraction } from 'discord.js';

const debug = (msg: string): void => {
  console.debug(`${chalk.bgCyan.white.bold(' DEBUG ')} ${chalk.cyan(msg)}`);
};

const debug2 = (title: string, msg: string): void => {
  console.debug(
    `${chalk.bgCyan.white.bold(' DEBUG ')} ${chalk.white.bold(
      title
    )} - ${chalk.cyan(msg)}`
  );
};

// const fecha = () =>
//   new Date().toLocaleDateString('es-AR', {
//     hour: 'numeric',
//     minute: 'numeric',
//     second: 'numeric'
//   });

const message = (interaction: ChatInputCommandInteraction): void => {
  const msg = `${interaction.commandName} ${interaction.options.data
    .map(
      option =>
        `[${option.name}:${
          option.options
            ? option.options.map(ops => `{${ops.name}:${ops.value}}`).join(', ')
            : option.value
        }]`
    )
    .join(', ')}`;

  console.info(
    `${chalk.green.bold('➤')} ${chalk.blue(interaction.user.tag)} (${chalk.grey(
      interaction.guild.name
    )}): /${msg}`
  );
};
const button = (interaction: ButtonInteraction): void => {
  const msg = `${interaction.customId}`;
  console.info(
    `${chalk.magenta.bold('➤')} ${chalk.blue(
      interaction.user.tag
    )} (${chalk.grey(interaction.guild.name)}): ${msg}`
  );
};

const info = (msg: string): void => {
  console.info(`${chalk.blue.bold('!')} ${chalk.cyanBright(msg)}`);
};

const question = (msg: string): void => {
  console.info(`${chalk.blue.bold('?')} ${chalk.italic(msg)}`);
};

const command = (msg: string): void => {
  console.info(chalk.gray(`$ ${msg}`));
};

const success = (task: string, msg: string): void => {
  console.info(`${chalk.bold(`✔ ${task}`)} ${msg}`);
};

const done = (msg: string): void => {
  console.info(`${chalk.bold('✔')} ${msg}`);
};

const error = (msg: string): void => {
  console.error(`${chalk.bold.bgRed(' ERROR ')} ${chalk.red(msg)}`);
};

const step = (msg: string): void => {
  console.info(`${chalk.bold.blue('➤')} ${chalk.bold(msg)}`);
};
const substep = (msg: string): void => {
  console.info(`${chalk.bold.green('  ➤')} ${msg}`);
};

export default {
  debug,
  debug2,
  info,
  command,
  question,
  success,
  done,
  error,
  step,
  substep,
  message,
  button
};
