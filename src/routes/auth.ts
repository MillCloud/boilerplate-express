import { Router } from '@awaitjs/express';
import { logger } from '@/utils';

const router = Router();

router.postAsync('/sign-in', async (request, response) => {
  console.log('GET / request.body', request.body);
  logger.warn('GET WARN Id cillum est mollit reprehenderit enim sint occaecat quis.');
  logger.error('GET ERROR Id cillum est mollit reprehenderit enim sint occaecat quis.');
  response.send('Hello Express! This is a GET response.');
});

router.postAsync('/sign-up', async (request, response) => {
  console.log('POST / request.body', request.body);
  logger.warn('POST WARN Id cillum est mollit reprehenderit enim sint occaecat quis.');
  logger.error('POST ERROR Id cillum est mollit reprehenderit enim sint occaecat quis.');
  response.send('Hello Express! This is a POST response.');
});

router.postAsync('/sign-out', async (request, response) => {
  console.log('POST / request.body', request.body);
  logger.warn('POST WARN Id cillum est mollit reprehenderit enim sint occaecat quis.');
  logger.error('POST ERROR Id cillum est mollit reprehenderit enim sint occaecat quis.');
  response.send('Hello Express! This is a POST response.');
});

export { router };
