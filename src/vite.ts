import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import path from 'path';
import fs from 'fs';
import express from 'express';
import spdy from 'spdy';
import pc from 'picocolors';
import mongoose from 'mongoose';
import {
  APP_ENVS,
  APP_MODE,
  APP_URL,
  APP_HTTPS,
  APP_PORT,
  APP_DB_URI,
  IS_PRODUCTION,
} from './constants';
import { useMiddlewares, useErrorMiddlewares } from './middlewares';
import useRoutes from './routes';
import pkg from '../package.json';
import { logger } from './middlewares/logger';

import './schedules';

APP_ENVS.map((fileName) => path.resolve(process.cwd(), fileName))
  .filter((filePath) => fs.existsSync(filePath))
  .forEach((filePath) => dotenvExpand.expand(dotenv.config({ path: filePath, override: true })));

const app = express();

app.set('trust proxy', ['loopback', 'linklocal', 'uniquelocal']);

useMiddlewares(app);
useRoutes(app);
useErrorMiddlewares(app);

export { app };

const server = APP_HTTPS
  ? spdy.createServer(
      {
        key: fs.readFileSync(path.resolve(process.cwd(), 'src', 'localhost-key.pem')),
        cert: fs.readFileSync(path.resolve(process.cwd(), 'src', 'localhost.pem')),
      },
      app,
    )
  : app;

server.on('error', (error) => {
  logger.error(error?.message ?? error);
  process.exit(1);
});

if (IS_PRODUCTION) {
  server.listen(APP_PORT, () => {
    logger.info(pc.cyan(`${pkg.name}@${pkg.version} in ${APP_MODE} is listening at ${APP_URL}.`));
  });
}

export { server };

mongoose
  .connect(APP_DB_URI)
  .then(() => {
    logger.info(pc.cyan(`${APP_DB_URI} is connected.`));
  })
  .catch((error) => {
    logger.error(error?.message ?? error);
    process.exit(1);
  });

mongoose.connection.on('disconnected', (error) => {
  logger.error(error?.message ?? error);
  process.exit(1);
});
