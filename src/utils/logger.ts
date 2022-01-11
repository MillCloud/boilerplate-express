import winston from 'winston';
import path from 'path';
import WinstonDailyRotateFile from 'winston-daily-rotate-file';
import { isProduction } from './isProduction';
import { tracer } from './tracer';

const { format, transports } = winston;
const { combine, colorize, timestamp, json, errors } = format;
const { Console } = transports;

export const logger = winston.createLogger({
  level: isProduction ? 'warn' : 'info',
  transports: isProduction
    ? [
        // PERF: consider multi process? https://blog.csdn.net/Justinjiang1314/article/details/80619038
        new WinstonDailyRotateFile({
          filename: '%DATE%.log',
          datePattern: 'YYYY-MM-DD-HH',
          zippedArchive: true,
          dirname: path.resolve('logs'),
          maxFiles: '14d',
          level: 'warn',
        }),
      ]
    : [new Console()],
  format: combine(
    ...([
      isProduction ? undefined : colorize(),
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
    ].filter((item) => !!item) as winston.Logform.Format[]),
  ),
});
