import { APP_API_ROUTER_PREFIX, IS_PRODUCTION } from '@/constants';
import { rateLimitMiddleware } from '@/middlewares';
import { getRouterPath } from '@/utils';
import { Express } from 'express';
import { authPath, authRouter } from './auth';
import { homePath, homeRouter } from './home';

export default (app: Express) => {
  if (IS_PRODUCTION) {
    app.use(APP_API_ROUTER_PREFIX, rateLimitMiddleware);
  }
  app.use(authPath, authRouter);
  app.use(homePath, homeRouter);
  app.use('*', (request, response, next) => {
    next({
      status: 404,
      message: `No matching routes for ${request.method} ${request.originalUrl}. Do you mean ${
        request.method
      } ${getRouterPath(request.originalUrl)}?`,
    });
  });
};

export { authPath, authRouter } from './auth';
export { homePath, homeRouter } from './home';
