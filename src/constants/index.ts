import pkg from '@/../package.json';

export const NODE_ENV = process.env.NODE_ENV ?? 'development';

export const IS_DEVELOPMENT = NODE_ENV === 'development';

export const IS_STAGING = NODE_ENV === 'staging';

export const IS_PRODUCTION = NODE_ENV === 'production';

export const IS_TESTING = NODE_ENV === 'testing';

export const APP_ENVS = ['.env', `.env.${NODE_ENV}`, '.env.local', `.env.${NODE_ENV}.local`];

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

export const APP_LOGGER_LEVEL = IS_PRODUCTION ? 'warn' : 'info';

export const APP_JWT_SECRET = process.env.JWT_SECRET ?? 'secret';

export const APP_JWT_EXPIRES_IN = /^\+?[1-9]\d*$/.test(process.env.JWT_EXPIRES_IN ?? '')
  ? Number(process.env.JWT_EXPIRES_IN)
  : 1000 * 60 * 60 * 24 * 7;

export const APP_DB_HOST = process.env.DB_HOST ?? '127.0.0.1';

export const APP_DB_PORT = /^\+?[1-9]\d*$/.test(process.env.DB_PORT ?? '')
  ? Number(process.env.DB_PORT)
  : 27_017;

export const APP_DB_NAME = process.env.DB_NAME ?? 'app';

export const APP_DB_URI = `mongodb://${APP_DB_HOST}:${APP_DB_PORT}/${APP_DB_NAME}`;

export const ISO8601_FORMAT = undefined;

export const DATE_FORMAT = 'YYYY-MM-DD';

export const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
