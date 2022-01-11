import expressWinston from 'express-winston';
import { logger as winstonInstance } from '@/utils';

export const requestLoggerMiddleware = expressWinston.logger({
  winstonInstance,
});

export const errorLoggerMiddleware = expressWinston.errorLogger({
  winstonInstance,
});
