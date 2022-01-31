import { Router } from 'express';
import {
  validate,
  bodyUsernameValidationChain,
  bodyPasswordValidationChain,
  scryptPassword,
  generateToken,
  formatDate,
} from '@/utils';
import { authMiddleware } from '@/middlewares';
import { AuthModel, UserModel } from '@/models';
import { JWT_EXPIRES_IN } from '@/constants';

export const base = '/auth';
const router = Router();

router.post(
  '/sign-in',
  validate([bodyUsernameValidationChain, bodyPasswordValidationChain]),
  async (request, response, next) => {
    try {
      const { username, password } = request.body as { username: string; password: string };
      // check username and password
      const user = await UserModel.findOne({ username });
      const userId = user?._id;
      const auth = await AuthModel.findOne({ userId });
      if (!user || !userId || !auth || scryptPassword(password, user._id) !== auth.password) {
        next({
          status: 401,
          message: `Wrong username ${username} or password.`,
        });
        return;
      }
      // update auth
      const token = auth.token || generateToken(userId);
      const expiredAt = new Date(Date.now() + JWT_EXPIRES_IN);
      await auth.updateOne({
        token,
        expiredAt,
      });
      // response
      response.json({
        user: user.toJSON(),
        auth: {
          token,
          expiredAt: formatDate(expiredAt),
        },
      });
      return;
    } catch (error: any) {
      next({
        message: error?.message ?? error,
      });
    }
  },
);

router.post(
  '/sign-up',
  validate([bodyUsernameValidationChain, bodyPasswordValidationChain]),
  async (request, response, next) => {
    try {
      const { username, password } = request.body as {
        username: string;
        password: string;
      };
      // username has been used
      const existedUser = await UserModel.findOne({ username });
      if (existedUser) {
        next({
          status: 409,
          message: `Username ${username} has been used.`,
        });
        return;
      }
      // create user
      const user = await UserModel.create({
        username,
      });
      // create auth
      await AuthModel.create<IAuth>({
        userId: user._id,
        password: scryptPassword(password, user._id),
        token: '',
        expiredAt: new Date(),
      });
      // response
      response.json({ message: 'OK.' });
      return;
    } catch (error: any) {
      next({
        message: `/auth/sign-up ${error?.message ?? error}`,
      });
    }
  },
);

router.post('/sign-out', authMiddleware, async (request, response, next) => {
  try {
    const { user } = request.body as Body;
    const auth = (await AuthModel.findOne({ userId: user._id }))!;
    await auth.updateOne({
      expiredAt: new Date(),
    });
    response.json({
      message: 'OK.',
    });
    return;
  } catch (error: any) {
    next({
      message: `/auth/sign-up ${error?.message ?? error}`,
    });
  }
});

router.post('/renew', authMiddleware, async (request, response, next) => {
  try {
    const { user } = request.body as Body;
    // update auth
    const auth = (await AuthModel.findOne({ userId: user._id }))!;
    const { token } = auth;
    const expiredAt = new Date(Date.now() + JWT_EXPIRES_IN);
    await auth.updateOne({
      expiredAt,
    });
    // response
    response.json({
      user: user.toJSON(),
      auth: {
        token,
        expiredAt: formatDate(expiredAt),
      },
    });
    return;
  } catch (error: any) {
    next({
      message: `/auth/sign-up ${error?.message ?? error}`,
    });
  }
});

export { router };
