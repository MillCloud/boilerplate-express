import { APP_API_ROUTER_PREFIX, APP_API_ROUTER_VERSION } from '@/constants';
import { rateLimitMiddleware } from '@/middlewares';
import { Express } from 'express';
import { router as authRouter, base as authRouterBase } from './auth';
import { router as homeRouter, base as homeRouterBase } from './home';

const path = (routerBase: string) =>
  `${APP_API_ROUTER_PREFIX}/${APP_API_ROUTER_VERSION}/${routerBase}`.replace(/\/+/g, '/');

export default (app: Express) => {
  app.use(APP_API_ROUTER_PREFIX, rateLimitMiddleware);
  app.use(path(authRouterBase), authRouter);
  app.use(path(homeRouterBase), homeRouter);
  app.use('*', (request, response, next) => {
    next({
      status: 404,
      message: `No matching routes for ${request.method} ${request.originalUrl}.`,
    });
  });
};

export { router as authRouter } from './auth';
export { router as homeRouter } from './home';
