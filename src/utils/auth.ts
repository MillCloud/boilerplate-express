import { Request } from 'express';
import crypto from 'crypto';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { isNumber, isArray, isFunction } from '@modyqyw/utils';
import { APP_JWT_SECRET } from '../constants';

export const scryptPassword = (
  password: string,
  salt: mongoose.Types.ObjectId | string,
  keylen = 64,
) => crypto.scryptSync(password, salt.toString(), keylen).toString('hex');

export const generateSalt = () => crypto.randomBytes(16).toString('hex');

export const generateToken = (userId: mongoose.Types.ObjectId | string) =>
  jwt.sign(userId.toString(), APP_JWT_SECRET);

export const verifyToken = (token: string) => jwt.verify(token, APP_JWT_SECRET);

export const getTokenFromRequest = (request: Request): string =>
  request.headers['x-access-token'] ??
  request.headers['x-token'] ??
  request.headers['X-Access-Token'] ??
  request.headers['X-Token'] ??
  request.query.token ??
  request.body.token ??
  '';

export const checkToken = (token: string) => !!token;

export const getUserIdFromToken = (token: string) => verifyToken(token) as string;

export const checkAuth = (auth: IAuthDocument | null) =>
  !!auth && Date.now() < auth.expiredAt.getTime();

export const checkPermission = (
  user: IUserDocument | null,
  param?: number | number[] | ((user: IUserDocument) => boolean),
) => {
  if (!user) {
    return false;
  }
  if (!param) {
    return true;
  }
  if (isNumber(param) && user.role === param) {
    return true;
  }
  if (isArray(param) && param.every((item) => isNumber(item)) && param.includes(user.role)) {
    return true;
  }
  if (isFunction(param)) {
    return param(user);
  }
  return false;
};
