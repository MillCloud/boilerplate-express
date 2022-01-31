import express from 'express';
import { useMiddlewares, useErrorMiddlewares } from './middlewares';
import useRoutes from './routes';

const app = express();

app.set('trust proxy', ['loopback', 'linklocal', 'uniquelocal']);

useMiddlewares(app);
useRoutes(app);
useErrorMiddlewares(app);

export { app };
