import request from 'supertest';
import { app } from '@/app';

describe('Route', () => {
  test('get a false route', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(404);
  });
});
