import pino from 'pino';
import pinoPretty from 'pino-pretty';

export const isProduction = process.env.NODE_ENV === 'production';

const logger = pino(
  pinoPretty({
    ignore: 'req.headers,req.remoteAddress,req.remotePort,res.headers,pid,hostname',
    levelFirst: true,
    singleLine: isProduction,
    translateTime: true,
  }),
);

export * from '@modyqyw/utils';
export { logger };

export { default as tracer } from 'cls-rtracer';
