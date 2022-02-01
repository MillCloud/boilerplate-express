export const JWT_SECRET = process.env.JWT_SECRET ?? 'secret';

export const JWT_EXPIRES_IN = /^\+?[1-9]\d*$/.test(process.env.JWT_EXPIRES_IN ?? '')
  ? Number(process.env.JWT_EXPIRES_IN)
  : 1000 * 60 * 60 * 24 * 7;
