import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { AuthModel, UserModel } from '../models';
import {
  getTokenFromRequest,
  checkToken,
  getUserIdFromToken,
  checkAuth,
  checkPermission,
} from '../utils';

export const generateAuthMiddleware =
  (param?: number | number[] | ((user: IUserDocument, next: NextFunction) => boolean)) =>
  async (request: Request, response: Response, next: NextFunction) => {
    const token = getTokenFromRequest(request);
    if (!checkToken(token, next)) {
      return;
    }
    try {
      const userId = getUserIdFromToken(token);
      const auth = await AuthModel.findOne({ userId: new mongoose.Types.ObjectId(userId), token });
      if (!checkAuth(auth, next)) {
        return;
      }
      const user = await UserModel.findById(userId);
      if (!checkPermission(user, next, param)) {
        return;
      }
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

export const authMiddleware = generateAuthMiddleware();
