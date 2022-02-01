import { Request, NextFunction } from 'express';
import crypto from 'crypto';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { isNumber, isArray, isFunction } from '@modyqyw/utils';
import { JWT_SECRET } from '../constants/auth';

export const scryptPassword = (
  password: string,
  salt: mongoose.Types.ObjectId | string,
  keylen = 64,
) => crypto.scryptSync(password, salt.toString(), keylen).toString('hex');

export const generateSalt = () => crypto.randomBytes(16).toString('hex');

export const generateToken = (userId: mongoose.Types.ObjectId | string) =>
  jwt.sign(userId.toString(), JWT_SECRET);

export const verifyToken = (token: string) => jwt.verify(token, JWT_SECRET);

export const getTokenFromRequest = (request: Request): string =>
  request.headers['x-access-token'] ??
  request.headers['x-token'] ??
  request.headers['X-Access-Token'] ??
  request.headers['X-Token'] ??
  request.query.token ??
  request.body.token ??
  '';

export const checkToken = (token: string, next: NextFunction) => {
  if (!token) {
    next({
      status: 403,
      message: 'Please sign in first.',
    });
    return false;
  }
  return true;
};

export const getUserIdFromToken = (token: string) => verifyToken(token) as string;

export const checkAuth = (auth: IAuthDocument | null, next: NextFunction) => {
  if (!auth || Date.now() >= auth.expiredAt.getTime()) {
    next({
      status: 403,
      message: 'Please sign in.',
    });
    return false;
  }
  return true;
};

export const checkPermission = (
  user: IUserDocument | null,
  next: NextFunction,
  param?: number | number[] | ((user: IUserDocument, next: NextFunction) => boolean),
) => {
  if (!param) {
    return true;
  }
  if (!user) {
    next({
      status: 403,
      message: 'Please sign in.',
    });
    return false;
  }
  if (isNumber(param) && user.role === param) {
    return true;
  }
  if (isArray(param) && param.every((item) => isNumber(item)) && param.includes(user.role)) {
    return true;
  }
  if (isFunction(param)) {
    return param(user, next);
  }
  next({
    status: 401,
    message: 'Access denied.',
  });
  return false;
};
