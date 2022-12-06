import dotenv from 'dotenv';

dotenv.config();

export const config = {
  TOKEN: process.env.TOKEN,
  CLIENT_ID: process.env.CLIENT_ID
};

export enum Commands {
  Ping = 'ping',
  Ayuda = 'ayuda',
  Gati = 'gati'
}

export default config;
