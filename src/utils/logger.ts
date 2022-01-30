import winston from 'winston';
import path from 'path';
import WinstonDailyRotateFile from 'winston-daily-rotate-file';
import { IS_PRODUCTION } from '@/constants';
import { tracer } from './tracer';

const { format, transports } = winston;

export const logger = winston.createLogger({
  level: IS_PRODUCTION ? 'warn' : 'info',
  transports: IS_PRODUCTION
    ? [
        new WinstonDailyRotateFile({
          filename: '%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          dirname: path.resolve('logs', process.pid.toString()),
          maxFiles: '14d',
          level: 'warn',
        }),
      ]
    : [new transports.Console()],
  format: format.combine(
    ...([
      IS_PRODUCTION ? undefined : format.colorize(),
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
