import { addAsync } from '@awaitjs/express';
import express from 'express';
import { useMiddlewares, useErrorMiddlewares } from './middlewares';
import useRoutes from './routes';

const app = addAsync(express());

useMiddlewares(app);
useRoutes(app);
useErrorMiddlewares(app);

export { app };
