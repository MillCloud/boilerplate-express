import winston from 'winston';
import { LOGGER_LEVEL, LOGGER_TRANSPORTS, LOGGER_FORMAT } from '../constants/logger';

export const logger = winston.createLogger({
  level: LOGGER_LEVEL,
  transports: LOGGER_TRANSPORTS,
  format: LOGGER_FORMAT,
});
