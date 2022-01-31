import { Express } from 'express';
import { router as authRouter, base as authRouterBase } from './auth';
import { router as homeRouter, base as homeRouterBase } from './home';

export default (app: Express) => {
  app.use(authRouterBase, authRouter);
  app.use(homeRouterBase, homeRouter);
  app.use('*', (request, response, next) => {
    next({
      status: 404,
      message: `No matching routes for ${request.method} ${request.originalUrl}.`,
    });
  });
};

export { router as authRouter } from './auth';
export { router as homeRouter } from './home';
