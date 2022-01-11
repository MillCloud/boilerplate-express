import express from 'express';
import spdy from 'spdy';
import pico from 'picocolors';
import fs from 'fs';
import path from 'path';
import { addAsync } from '@awaitjs/express';
import pkg from '@/../package.json';
import { logger } from '@/utils';
import {
  contextMiddleware,
  tracerMiddleware,
  loggerMiddleware,
  jsonParserMiddleware,
  rawParserMiddleware,
  textParserMiddleware,
  urlencodedParserMiddleware,
} from './middlewares';

// specified port
const PORT = 3000;

// it is very expensive in terms of performances to handle the ssl termination with node
// be careful
const HTTPS = Boolean(JSON.parse(process.env.HTTPS ?? 'false')) || false;

const app = addAsync(express());

app.use(contextMiddleware);
app.use(tracerMiddleware);
app.use(loggerMiddleware);
app.use(jsonParserMiddleware);
app.use(rawParserMiddleware);
app.use(textParserMiddleware);
app.use(urlencodedParserMiddleware);

app.getAsync('/', async (request, response) => {
  console.log('request.body', request.body);
  logger.warn('Id cillum est mollit reprehenderit enim sint occaecat quis.');
  logger.warn('Id cillum est mollit reprehenderit enim sint occaecat quis.');
  logger.warn('Id cillum est mollit reprehenderit enim sint occaecat quis.');
  logger.warn('Id cillum est mollit reprehenderit enim sint occaecat quis.');
  logger.warn('Id cillum est mollit reprehenderit enim sint occaecat quis.');
  logger.warn('Id cillum est mollit reprehenderit enim sint occaecat quis.');
  response.send('Hello Express! This is a GET response.');
});

app.postAsync('/', async (request, response) => {
  console.log('request.body', request.body);
  response.send('Hello Express! This is a POST response.');
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
      `${pkg.name}@${pkg.version} in ${(
        process.env.NODE_ENV || 'DEVELOPMENT'
      ).toUpperCase()} is listening at ${HTTPS ? 'https' : 'http'}://localhost:${PORT}.`,
    ),
  );
});
