export const DB_HOST = process.env.DB_HOST ?? '127.0.0.1';

export const DB_PORT = /^\+?[1-9]\d*$/.test(process.env.DB_PORT ?? '')
  ? Number(process.env.DB_PORT)
  : 27_017;

export const DB_NAME = process.env.DB_NAME ?? 'app';

export const DB_URI = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;
