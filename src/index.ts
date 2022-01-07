import express from 'express';
import spdy from 'spdy';
import pico from 'picocolors';
import fs from 'fs';
import path from 'path';
import { addAsync } from '@awaitjs/express';
import pkg from '@/../package.json';
import { logger } from '@/utils';
import { contextMiddleware, tracerMiddleware, loggerMiddleware } from './middlewares';

// specified port
const PORT = 3000;

// it is very expensive in terms of performances to handle the ssl termination with node
// be careful
const HTTPS = Boolean(JSON.parse(process.env.HTTPS ?? 'false')) || false;

const app = addAsync(express());

app.use(contextMiddleware);
app.use(tracerMiddleware);
app.use(loggerMiddleware);

app.getAsync('/', async (request, response) => {
  response.send('Hello Express! This is a GET response.');
});

const server = HTTPS
  ? spdy.createServer(
      {
        key: fs.readFileSync(path.resolve('src', 'localhost-key.pem')),
        cert: fs.readFileSync(path.resolve('src', 'localhost.pem')),
      },
      app,
    )
  : app;

// @ts-ignore
server.listen(PORT, (error) => {
  if (error) {
    logger.error(error?.message ?? error);
    // eslint-disable-next-line unicorn/no-process-exit
    process.exit(1);
  }
  logger.info(
    pico.cyan(
      `${pkg.name}@${pkg.version} is listening at ${HTTPS ? 'https' : 'http'}://localhost:${PORT}.`,
    ),
  );
});
