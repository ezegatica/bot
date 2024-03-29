import dotenv from 'dotenv';

dotenv.config();

export const config = {
  TOKEN: process.env.TOKEN,
  CLIENT_ID: process.env.CLIENT_ID,
  NODE_ENV: process.env.NODE_ENV || 'production',
  DATABASE_URL: process.env.DATABASE_URL,
  PORT: process.env.PORT || 3000
};

export default config;
