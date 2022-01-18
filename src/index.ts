import express from 'express';
import spdy from 'spdy';
import pico from 'picocolors';
import fs from 'fs';
import path from 'path';
import { addAsync } from '@awaitjs/express';
import { logger } from '@/utils';
import pkg from '../package.json';
import {
  compressionMiddleware,
  corsMiddleware,
  requestLoggerMiddleware,
  errorLoggerMiddleware,
  jsonParserMiddleware,
  partialResponseMiddleware,
  tracerMiddleware,
} from './middlewares';

// specified port
const PORT = 3000;

// it is very expensive in terms of performances to handle the ssl termination with node
// be careful
const HTTPS = Boolean(JSON.parse(process.env.HTTPS ?? 'false')) || false;

const app = addAsync(express());

app.use(corsMiddleware);
app.use(tracerMiddleware);
app.use(requestLoggerMiddleware);
app.use(jsonParserMiddleware);
app.use(compressionMiddleware);
app.use(partialResponseMiddleware);

app.getAsync('/', async (request, response) => {
  console.log('GET / request.body', request.body);
  logger.warn('GET WARN Id cillum est mollit reprehenderit enim sint occaecat quis.');
  logger.error('GET ERROR Id cillum est mollit reprehenderit enim sint occaecat quis.');
  response.send('Hello Express! This is a GET response.');
});

app.postAsync('/', async (request, response) => {
  console.log('POST / request.body', request.body);
  logger.warn('POST WARN Id cillum est mollit reprehenderit enim sint occaecat quis.');
  logger.error('POST ERROR Id cillum est mollit reprehenderit enim sint occaecat quis.');
  response.send('Hello Express! This is a POST response.');
});

app.use(errorLoggerMiddleware);

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
      `${pkg.name}@${pkg.version} in ${(
        process.env.NODE_ENV || 'DEVELOPMENT'
      ).toUpperCase()} is listening at ${HTTPS ? 'https' : 'http'}://localhost:${PORT}.`,
    ),
  );
});
