export const NODE_ENV = process.env.NODE_ENV ?? 'development';

export const IS_PRODUCTION = NODE_ENV === 'production';
