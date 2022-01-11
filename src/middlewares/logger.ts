import pinoHttp from 'pino-http';
import { logger } from '@/utils';

const loggerMiddleware = pinoHttp({ logger });

export { loggerMiddleware };
