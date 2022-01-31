import crypto from 'crypto';
import mongoose from 'mongoose';
import { JWT_SECRET } from '@/constants';
import jwt from 'jsonwebtoken';

export const scryptPassword = (
  password: string,
  salt: mongoose.Types.ObjectId | string,
  keylen = 64,
) => crypto.scryptSync(password, salt.toString(), keylen).toString('hex');

export const generateSalt = () => crypto.randomBytes(16).toString('hex');

export const generateToken = (userId: mongoose.Types.ObjectId | string) =>
  jwt.sign(userId.toString(), JWT_SECRET);

export const verifyToken = (token: string) => jwt.verify(token, JWT_SECRET);
