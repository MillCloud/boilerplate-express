// eslint-disable-next-line prefer-destructuring
export const NODE_ENV = process.env.NODE_ENV;

export const IS_PRODUCTION = NODE_ENV === 'production';

export const PORT = /^\+?[1-9]\d*$/.test(process.env.PORT ?? '') ? Number(process.env.PORT) : 3000;

export const HTTPS = Boolean(JSON.parse(process.env.HTTPS ?? 'false')) || false;
