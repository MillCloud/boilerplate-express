import expressWinston from 'express-winston';
import winston from 'winston';
import WinstonDailyRotateFile from 'winston-daily-rotate-file';
import path from 'path';
import { APP_LOGGER_LEVEL, IS_PRODUCTION, IS_TEST } from '../constants';
import { tracer } from './tracer';

const { transports, format } = winston;

export const logger = winston.createLogger({
  level: APP_LOGGER_LEVEL,
  silent: IS_TEST,
  transports: IS_PRODUCTION
    ? [
        new WinstonDailyRotateFile({
          filename: '%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          dirname: path.resolve(process.cwd(), 'logs', process.pid.toString()),
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
  ),
});

export const requestLoggerMiddleware = expressWinston.logger({
  winstonInstance: logger,
});

export const errorLoggerMiddleware = expressWinston.errorLogger({
  winstonInstance: logger,
});
