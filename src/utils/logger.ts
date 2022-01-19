import winston from 'winston';
import path from 'path';
import WinstonDailyRotateFile from 'winston-daily-rotate-file';
import { isProduction } from './isProduction';
import { tracer } from './tracer';

const { format, transports } = winston;

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
    : [new transports.Console()],
  format: format.combine(
    ...([
      isProduction ? undefined : format.colorize(),
      format((info) => {
        const id = tracer.id();
        if (id) {
          // eslint-disable-next-line no-param-reassign
          info.requestId = id;
        }
        return info;
      })(),
      format.timestamp(),
      format.json(),
      format.errors({ stack: true }),
      format.printf((info) => {
        const timestamp = info?.timestamp ?? '';
        const requestId = info?.requestId ?? '';
        const level = info?.level ?? '';
        const message = info?.message ?? '';
        const statusCode =
          info?.meta?.res?.statusCode ?? info?.res?.statusCode ?? info?.statusCode ?? '';
        const responseTime = `${info?.meta?.responseTime ?? info?.responseTime ?? 0}ms`;
        return `${timestamp} ${requestId} ${level} ${message} ${statusCode} ${responseTime}`.replace(
          /\s+/g,
          ' ',
        );
      }),
    ].filter((item) => !!item) as winston.Logform.Format[]),
  ),
});
