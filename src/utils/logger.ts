// import pino, { destination, type LoggerOptions } from 'pino';
import winston from 'winston';
import path from 'path';
import WinstonDailyRotateFile from 'winston-daily-rotate-file';
import { isProduction } from './isProduction';
import { tracer } from './tracer';

const { format, transports } = winston;
const { combine, colorize, timestamp, json, errors } = format;
const { File, Console } = transports;

export const logger = winston.createLogger({
  level: isProduction ? 'warn' : 'info',
  transports: isProduction
    ? [
        new File({
          filename: path.resolve('logs', 'index.log'),
          level: 'warn',
        }),
        new WinstonDailyRotateFile({
          filename: 'application-%DATE%.log',
          datePattern: 'YYYY-MM-DD-HH',
          zippedArchive: true,
          dirname: path.resolve('logs'),
          maxFiles: '14d',
        }),
      ]
    : [new Console()],
  format: combine(
    colorize(),
    format((info) => {
      const id = tracer.id();
      if (id) {
        // eslint-disable-next-line no-param-reassign
        info.requestId = id;
      }
      return info;
    })(),
    timestamp(),
    json(),
    errors({ stack: true }),
    format.printf(
      (info) =>
        `${info?.timestamp} ${info?.requestId ?? ''} ${info?.level}: ${info?.message} ${
          info?.meta?.res?.statusCode ?? ''
        } ${info?.meta?.responseTime ?? 0}ms`,
    ),
  ),
});
