import request from 'supertest';
import { app } from '@/app';
import { homeRouterBasePath, homeController } from '@/controllers';
import { getRoutePath } from '@/utils';

describe('Home Controller', () => {
  test('get', async () => {
    const response = await request(app).get(
      getRoutePath(homeRouterBasePath, homeController.get.path),
    );
    expect(response.statusCode).toBe(200);
  });

  test('post', async () => {
    const response = await request(app).post(
      getRoutePath(homeRouterBasePath, homeController.post.path),
    );
    expect(response.statusCode).toBe(200);
  });
});
