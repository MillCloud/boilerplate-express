import { ExpressWithAsync } from '@awaitjs/express';
import { router as authRouter } from './auth';
import { router as homeRouter } from './home';

export default (app: ExpressWithAsync) => {
  app.use('/auth', authRouter);
  app.use('/', homeRouter);
};

export { router as authRouter } from './auth';
export { router as homeRouter } from './home';
