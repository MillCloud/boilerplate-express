import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { logger } from './logger';
import { AuthModel, UserModel } from '../models';
import {
  getTokenFromRequest,
  checkToken,
  getUserIdFromToken,
  checkAuth,
  checkPermission,
} from '../utils';

export const generateAuthMiddleware =
  (param?: number | number[] | ((user: IUserDocument) => boolean)) =>
  async (request: Request, response: Response, next: NextFunction) => {
    const token = getTokenFromRequest(request);
    if (!checkToken(token)) {
      next({
        status: 403,
        message: 'Please sign in first.',
      });
      return;
    }
    try {
      const userId = getUserIdFromToken(token);
      const auth = await AuthModel.findOne({ userId: new mongoose.Types.ObjectId(userId), token });
      if (!checkAuth(auth)) {
        next({
          status: 403,
          message: 'Please sign in first.',
        });
        return;
      }
      const user = await UserModel.findById(userId);
      if (!checkPermission(user, param)) {
        next({
          status: 401,
          message: 'Access denied. Do you have the access?',
        });
        return;
      }
      request.body.user = user;
      next();
      return;
    } catch (error) {
      // https://github.com/auth0/node-jsonwebtoken#errors--codes
      // @ts-ignore
      logger.error(error?.message ?? error ?? '');
      next({
        status: 403,
        message: `Please sign in first.`,
      });
    }
  };

export const authMiddleware = generateAuthMiddleware();
