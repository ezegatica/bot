import dotenv from 'dotenv';

dotenv.config();

export const config = {
  TOKEN: process.env.TOKEN,
  CLIENT_ID: process.env.CLIENT_ID
};

export default config;
