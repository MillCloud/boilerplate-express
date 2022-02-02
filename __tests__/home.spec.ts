import request from 'supertest';
import { app } from '@/app';
import { homeRouterBase, homeController } from '@/controllers';
import { getFullPath } from '@/utils';

describe('Home Controller', () => {
  test('get', async () => {
    const response = await request(app).get(getFullPath(homeRouterBase, homeController.get.path));
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      message: 'Hello Express! This is a GET response.',
    });
  });

  test('post', async () => {
    const response = await request(app).post(getFullPath(homeRouterBase, homeController.post.path));
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      message: 'Hello Express! This is a POST response.',
    });
  });
});
