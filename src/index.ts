import express from 'express';
import spdy from 'spdy';
import pico from 'picocolors';
import fs from 'fs';
import path from 'path';

// specified port
const PORT = 3000;

// it is very expensive in terms of performances to handle the ssl termination with node
// be careful
const HTTPS = Boolean(JSON.parse(process.env.HTTPS ?? 'false')) || false;

const app = express();

app.get('/', (request, response) => {
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

server.listen(PORT, () => {
  console.log(
    pico.cyan(`\nExpress is listening at ${HTTPS ? 'https' : 'http'}://localhost:${PORT}.\n`),
  );
});
