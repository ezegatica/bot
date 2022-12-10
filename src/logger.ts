import chalk from 'chalk';

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

const message = (user: string, server: string, msg: string): void => {
  console.info(
    `${chalk.green.bold('➤')} ${chalk.blue(user)} (${chalk.grey(
      server
    )}): /${msg}`
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
  message
};
