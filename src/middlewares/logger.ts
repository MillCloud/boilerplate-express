import pinoHttp from 'pino-http';
import { destination } from 'pino';
import path from 'path';
import dayjs from 'dayjs';
import { logger, tracer, isProduction } from '@/utils';

const loggerMiddleware = pinoHttp(
  {
    autoLogging: !isProduction,
    logger,
    serializers: {
      req: (request) => ({
        ...request,
        id: tracer.id(),
      }),
    },
    useLevel: isProduction ? 'warn' : 'info',
  },
  isProduction
    ? destination({
        dest: path.resolve('logs', `${dayjs().format('YYYY-MM-DD')}.log`),
        mkdir: true,
        minLength: 0,
        sync: false,
      })
    : undefined,
);

export { loggerMiddleware };
