import pino, { destination, type LoggerOptions } from 'pino';
import path from 'path';
import { isProduction } from './isProduction';
import { tracer } from './tracer';
import pkg from '@/../package.json';

const options: LoggerOptions = {
  base: null,
  formatters: {
    level: (level) => ({ level }),
  },
  level: isProduction ? 'warn' : 'info',
  mixin: isProduction
    ? () => ({
        reqId: tracer.id(),
      })
    : undefined,
  redact: undefined,
  timestamp: pino.stdTimeFunctions.isoTime,
  transport: isProduction
    ? undefined
    : {
        target: 'pino-http-print',
        options: {
          all: true,
          relativeUrl: true,
          lax: true,
        },
      },
};

// for log rotation
// see https://getpino.io/#/docs/help?id=reopening-log-files
const destinationStream = destination({
  dest: path.resolve('logs', `${pkg.name}.log`),
  mkdir: true,
  sync: false,
  retryEAGAIN: () => true,
});
if (isProduction) {
  process.on('SIGHUP', () => destinationStream.reopen());
}

export const logger = isProduction ? pino(options, destinationStream) : pino(options);
