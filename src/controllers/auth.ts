import { Request, Response, NextFunction } from 'express';
import { UserModel, AuthModel } from '@/models';
import { scryptPassword, getTokenFromUserId, formatDate } from '@/utils';
import { APP_JWT_EXPIRES_IN } from '@/constants';
import {
  authMiddleware,
  validate,
  bodyUsernameValidationChain,
  bodyPasswordValidationChain,
} from '@/middlewares';

export const USER_ROLE = {
  1: 'admin',
  2: 'user',
  admin: 1,
  user: 2,
};

export const authRouterBasePath = '/';

export const authController: IController = {
  signIn: {
    path: '/sign-in',
    methods: ['post'],
    middlewares: [validate([bodyUsernameValidationChain, bodyPasswordValidationChain])],
    function: async (request: Request, response: Response, next: NextFunction) => {
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
        const token = auth.token || getTokenFromUserId(userId);
        const expiredAt = new Date(Date.now() + APP_JWT_EXPIRES_IN);
        await auth.updateOne({
          token,
          expiredAt,
          updatedAt: new Date(),
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
          message: `/auth/sign-in ${error?.message ?? error}`,
        });
      }
    },
  },

  signUp: {
    path: '/sign-up',
    methods: ['post'],
    middlewares: [validate([bodyUsernameValidationChain, bodyPasswordValidationChain])],
    function: async (request: Request, response: Response, next: NextFunction) => {
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
          role: USER_ROLE.user,
        });
        // create auth
        await AuthModel.create<IAuth>({
          userId: user._id,
          password: scryptPassword(password, user._id),
          token: '',
          expiredAt: new Date(),
        });
        // response
        response.status(201).json();
        return;
      } catch (error: any) {
        next({
          message: `/auth/sign-up ${error?.message ?? error}`,
        });
      }
    },
  },

  signOut: {
    path: '/sign-out',
    methods: ['post'],
    middlewares: [authMiddleware],
    function: async (request: Request, response: Response, next: NextFunction) => {
      try {
        const { user } = request.body as Body;
        const auth = (await AuthModel.findOne({ userId: user._id }))!;
        await auth.updateOne({
          expiredAt: new Date(),
          updatedAt: new Date(),
        });
        response.json({
          message: 'OK.',
        });
        return;
      } catch (error: any) {
        next({
          message: `/auth/sign-out ${error?.message ?? error}`,
        });
      }
    },
  },

  renew: {
    path: '/renew',
    methods: ['post'],
    middlewares: [authMiddleware],
    function: async (request: Request, response: Response, next: NextFunction) => {
      try {
        const { user } = request.body as Body;
        // update auth
        const auth = (await AuthModel.findOne({ userId: user._id }))!;
        const { token } = auth;
        const expiredAt = new Date(Date.now() + APP_JWT_EXPIRES_IN);
        await auth.updateOne({
          expiredAt,
          updatedAt: new Date(),
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
          message: `/auth/renew ${error?.message ?? error}`,
        });
      }
    },
  },
};
