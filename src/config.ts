import dotenv from 'dotenv';

dotenv.config();

export const config = {
  TOKEN: process.env.TOKEN,
  CLIENT_ID: process.env.CLIENT_ID
};

export enum Commands {
  Ping = 'ping',
  Ayuda = 'ayuda',
  Simpsons = 'simpsons',
  Codigo = 'codigo',
  Clear = 'clear'
}

export default config;
