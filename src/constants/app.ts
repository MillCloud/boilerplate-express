import pkg from '@/../package.json';
import { NODE_ENV } from './env';

export const APP_MODE = NODE_ENV?.toUpperCase();

export const APP_HTTPS = ['true', 'false'].includes(process.env.HTTPS ?? '')
  ? (JSON.parse(process.env.HTTPS as string) as boolean)
  : false;

export const APP_HOST = process.env.APP_HOST ?? '127.0.0.1';

export const APP_PORT = /^\+?[1-9]\d*$/.test(process.env.PORT ?? '')
  ? Number(process.env.APP_PORT)
  : 3000;

export const APP_API_ROUTER_PREFIX = process.env.APP_API_ROUTER_PREFIX ?? '/api';

export const APP_VERSION = pkg.version;

export const APP_API_ROUTER_VERSION = `v${APP_VERSION.split('.')[0]}`;

export const APP_URL = `${
  APP_HTTPS ? 'https' : 'http'
}://${APP_HOST}:${APP_PORT}${APP_API_ROUTER_PREFIX}/${APP_API_ROUTER_VERSION}`;
