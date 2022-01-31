import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { AuthModel, UserModel } from '../models';
import { verifyToken } from '../utils';

export const authMiddleware = async (request: Request, response: Response, next: NextFunction) => {
  const token: string =
    request.headers['x-access-token'] ??
    request.headers['x-token'] ??
    request.headers['X-Access-Token'] ??
    request.headers['X-Token'] ??
    request.query.token ??
    request.body.token ??
    '';

  if (!token) {
    next({
      status: 403,
      message: 'Please sign in first.',
    });
    return;
  }

  try {
    const userId = verifyToken(token) as string;
    const auth = await AuthModel.findOne({ userId: new mongoose.Types.ObjectId(userId), token });
    if (!auth) {
      next({
        status: 403,
        message: 'Please sign in.',
      });
      return;
    }
    if (Date.now() >= auth.expiredAt.getTime()) {
      // expired
      next({
        status: 403,
        message: 'Please sign in.',
      });
      return;
    }
    // not expired
    const user = await UserModel.findById(userId);
    // eslint-disable-next-line no-param-reassign
    request.body.user = user;
    next();
    return;
  } catch (error) {
    // https://github.com/auth0/node-jsonwebtoken#errors--codes
    next({
      status: 403,
      message: `${
        // @ts-ignore
        error?.message ?? error ? `${error?.message ?? error}. ` : ''
      }Please sign in.`,
    });
  }
};
