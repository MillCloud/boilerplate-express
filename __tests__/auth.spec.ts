import request from 'supertest';
import { app } from '@/app';
import { authRouterBasePath, authController } from '@/controllers';
import { getRoutePath } from '@/utils';
import pkg from '@/../package.json';
import dayjs from 'dayjs';
import { connectDb, disconnectDb } from './setup-and-teardown';

beforeAll(connectDb);
afterAll(disconnectDb);

describe('Auth Controller', () => {
  let token = '';
  let expiredAt = '';

  test('non-string username sign up', async () => {
    const response = await request(app)
      .post(getRoutePath(authRouterBasePath, authController.signUp.path))
      .send({
        username: 111_111,
        password: 'Abc123,.',
      });
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty(
      'message',
      'Username must be a string between 4 and 20 characters long.',
    );
  });

  test('short username sign up', async () => {
    const response = await request(app)
      .post(getRoutePath(authRouterBasePath, authController.signUp.path))
      .send({
        username: 'a',
        password: 'Abc123,.',
      });
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty(
      'message',
      'Username must be a string between 4 and 20 characters long.',
    );
  });

  test('weak password sign up', async () => {
    const response = await request(app)
      .post(getRoutePath(authRouterBasePath, authController.signUp.path))
      .send({
        username: pkg.name,
        password: 'abcdefgh',
      });
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty(
      'message',
      'Password must be a string between 8 and 20 characters long, including 1 lowercase, 1 uppercase, 1 number and 1 symbol at lease.',
    );
  });

  test('short password sign up', async () => {
    const response = await request(app)
      .post(getRoutePath(authRouterBasePath, authController.signUp.path))
      .send({
        username: pkg.name,
        password: 'Abc123,',
      });
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty(
      'message',
      'Password must be a string between 8 and 20 characters long, including 1 lowercase, 1 uppercase, 1 number and 1 symbol at lease.',
    );
  });

  test('good sign up', async () => {
    const response = await request(app)
      .post(getRoutePath(authRouterBasePath, authController.signUp.path))
      .send({
        username: pkg.name,
        password: 'Abc123,.',
      });
    expect(response.statusCode).toBe(200);
  });

  test('sign up again', async () => {
    const response = await request(app)
      .post(getRoutePath(authRouterBasePath, authController.signUp.path))
      .send({
        username: pkg.name,
        password: 'Abc123,.',
      });
    expect(response.statusCode).toBe(409);
    expect(response.body).toHaveProperty('message', `Username ${pkg.name} has been used.`);
  });

  test('wrong username sign in', async () => {
    const response = await request(app)
      .post(getRoutePath(authRouterBasePath, authController.signIn.path))
      .send({
        username: 'abcd',
        password: 'Abc123,.',
      });
    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty('message', `Wrong username abcd or password.`);
  });

  test('wrong password sign in', async () => {
    const response = await request(app)
      .post(getRoutePath(authRouterBasePath, authController.signIn.path))
      .send({
        username: pkg.name,
        password: 'Abc123,..',
      });
    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty('message', `Wrong username ${pkg.name} or password.`);
  });

  test('sign in', async () => {
    const response = await request(app)
      .post(getRoutePath(authRouterBasePath, authController.signIn.path))
      .send({
        username: pkg.name,
        password: 'Abc123,.',
      });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('user');
    expect(response.body).toHaveProperty('auth.token');
    expect(response.body).toHaveProperty('auth.expiredAt');
    token = response.body.auth.token;
    expiredAt = response.body.auth.expiredAt;
  });

  test('non-token renew', async () => {
    const response = await request(app)
      .post(getRoutePath(authRouterBasePath, authController.renew.path))
      .send({
        username: pkg.name,
        password: 'Abc123,.',
      });
    expect(response.statusCode).toBe(403);
    expect(response.body).toHaveProperty('message', 'Please sign in first.');
  });

  test('renew', async () => {
    const response = await request(app)
      .post(getRoutePath(authRouterBasePath, authController.renew.path))
      .send({
        username: pkg.name,
        password: 'Abc123,.',
        token,
      });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('user');
    expect(response.body).toHaveProperty('auth.token', token);
    expect(response.body).toHaveProperty('auth.expiredAt');
    expect(dayjs(response.body.auth.expiredAt).valueOf()).toBeGreaterThanOrEqual(
      dayjs(expiredAt).valueOf(),
    );
  });

  test('non-token sign out', async () => {
    const response = await request(app).post(
      getRoutePath(authRouterBasePath, authController.signOut.path),
    );
    expect(response.statusCode).toBe(403);
    expect(response.body).toHaveProperty('message', 'Please sign in first.');
  });

  test('sign out', async () => {
    const response = await request(app)
      .post(getRoutePath(authRouterBasePath, authController.signOut.path))
      .send({
        token,
      });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'OK.');
  });
});
