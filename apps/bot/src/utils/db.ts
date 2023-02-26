import Keyv from 'keyv';
import config from '../config';

export const db = new Keyv(config.DATABASE_URL);
