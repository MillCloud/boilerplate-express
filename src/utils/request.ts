import got, { Options } from 'got';

export const request = got.extend(
  new Options({
    timeout: {
      request: 30_000,
    },
  }),
);
