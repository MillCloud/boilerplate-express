import winston from 'winston';
import path from 'path';
import WinstonDailyRotateFile from 'winston-daily-rotate-file';
import { tracer } from '../utils/tracer';
import { IS_PRODUCTION } from './env';

const { format, transports } = winston;

export const LOGGER_LEVEL = IS_PRODUCTION ? 'warn' : 'info';

export const LOGGER_TRANSPORTS = IS_PRODUCTION
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
  : [new transports.Console()];

export const LOGGER_FORMAT = format.combine(
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
      const timestamp = info?.timestamp ?? 'NO_TIMESTAMP';
      const requestId = info?.requestId ?? 'NO_REQUEST_ID';
      const level = info?.level ?? 'NO_LEVEL';
      const statusCode =
        info?.meta?.error?.status ??
        info?.meta?.error?.statusCode ??
        info?.meta?.res?.status ??
        info?.meta?.res?.statusCode ??
        info?.error?.status ??
        info?.error?.statusCode ??
        info?.res?.status ??
        info?.res?.statusCode ??
        info?.status ??
        info?.statusCode ??
        'NO_STATUS_CODE';
      const responseTime = `${info?.meta?.responseTime ?? info?.responseTime ?? 0}ms`;
      const message =
        info?.meta?.error?.message ??
        info?.meta?.error?.msg ??
        info?.meta?.res?.message ??
        info?.meta?.res?.msg ??
        info?.error?.message ??
        info?.error?.msg ??
        info?.res?.message ??
        info?.res?.msg ??
        info?.message ??
        info?.msg ??
        'NO_MESSAGE';
      return `${timestamp} ${requestId} ${level} ${statusCode} ${responseTime} ${message}`.trim();
    }),
  ].filter((item) => !!item) as winston.Logform.Format[]),
);
