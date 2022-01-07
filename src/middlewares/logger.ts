import pinoHttp from 'pino-http';
import { logger, tracer } from '@/utils';

const loggerMiddleware = pinoHttp({
  logger,
  serializers: {
    req: (request) => ({
      ...request,
      id: tracer.id(),
    }),
  },
  useLevel: process.env.NODE_ENV === 'production' ? 'warn' : 'info',
});

export { loggerMiddleware };
