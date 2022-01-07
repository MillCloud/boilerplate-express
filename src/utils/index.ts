import pino from 'pino';
import pinoPretty from 'pino-pretty';

const logger = pino(
  pinoPretty({
    colorize: true,
    ignore: 'req.headers,req.remoteAddress,req.remotePort,res.headers,pid,hostname',
    levelFirst: true,
    translateTime: true,
  }),
);

export * from '@modyqyw/utils';
export { logger };

export { default as tracer } from 'cls-rtracer';
