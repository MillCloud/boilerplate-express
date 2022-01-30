import { NODE_ENV } from './env';

export const APP_MODE = NODE_ENV?.toUpperCase();

export const APP_HOST = process.env.APP_HOST ?? '127.0.0.1';

export const APP_PORT = /^\+?[1-9]\d*$/.test(process.env.PORT ?? '')
  ? Number(process.env.APP_PORT)
  : 3000;

export const APP_HTTPS = Boolean(JSON.parse(process.env.HTTPS ?? 'false')) || false;

export const APP_URL = `${APP_HTTPS ? 'https' : 'http'}://${APP_HOST}:${APP_PORT}`;
