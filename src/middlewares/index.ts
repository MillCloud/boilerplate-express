import { Express } from 'express';

import { compressionMiddleware } from './compression';
import { corsMiddleware } from './cors';
import { errorMiddleware } from './error';
import { helmetMiddleware } from './helmet';
import { requestLoggerMiddleware, errorLoggerMiddleware } from './logger';
import { jsonParserMiddleware, urlencodedParserMiddleware } from './parser';
import { staticMiddleware } from './static';
import { tracerMiddleware } from './tracer';

export * from './compression';
export * from './cors';
export * from './error';
export * from './helmet';
export * from './logger';
export * from './parser';
export * from './static';
export * from './tracer';

export const useMiddlewares = (app: Express) => {
  app.use(requestLoggerMiddleware);
  app.use(corsMiddleware);
  app.use(helmetMiddleware);
  app.use(tracerMiddleware);
  app.use(compressionMiddleware);
  app.use(jsonParserMiddleware);
  app.use(urlencodedParserMiddleware);
  app.use('/static', staticMiddleware);
};

export const useErrorMiddlewares = (app: Express) => {
  app.use(errorLoggerMiddleware);
  app.use(errorMiddleware);
};
