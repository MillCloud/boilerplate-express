import { Router } from 'express';

export const base = '/';
const router = Router();

router.get('/', async (request, response) => {
  response.json({
    message: 'Hello Express! This is a GET response.',
  });
});

router.post('/', async (request, response) => {
  response.json({
    message: 'Hello Express! This is a POST response.',
  });
});

export { router };
