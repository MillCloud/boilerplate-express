import spdy from 'spdy';
import fs from 'fs';
import path from 'path';
import pc from 'picocolors';
import pkg from '../package.json';
import { APP_MODE, APP_URL, APP_HTTPS, APP_PORT } from './constants';
import { app } from './app';
import { logger } from './middlewares/logger';

const server = APP_HTTPS
  ? spdy.createServer(
      {
        key: fs.readFileSync(path.resolve(process.cwd(), 'src', 'localhost-key.pem')),
        cert: fs.readFileSync(path.resolve(process.cwd(), 'src', 'localhost.pem')),
      },
      app,
    )
  : app;

server
  .listen(APP_PORT, () => {
    logger.info(pc.cyan(`${pkg.name}@${pkg.version} in ${APP_MODE} is listening at ${APP_URL}.`));
  })
  .on('error', (error) => {
    logger.error(error?.message ?? error);
    process.exit(1);
  });

export { server };
