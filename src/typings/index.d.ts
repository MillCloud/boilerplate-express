import mongoose from 'mongoose';
import { RequestHandler } from 'express';

declare global {
  type TMethod = 'all' | 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head';

  type TController = {
    path: string;
    methods: TMethod[];
    middlewares: RequestHandler[];
    function: RequestHandler;
  }[];

  type TDocument<T = any> = mongoose.Document<unknown, any, T> &
    T & {
      _id: mongoose.Types.ObjectId;
    };

  interface IAuth {
    token: string;
    userId: mongoose.Types.ObjectId;
    password: string;
    expiredAt: Date;
    createdAt?: Date;
    updatedAt?: Date;
  }

  interface IAuthDocument extends TDocument<IAuth> {}

  interface IUser {
    username: string;
    role: number;
    createdAt?: Date;
    updatedAt?: Date;
  }

  interface IUserDocument extends TDocument<IUser> {}

  interface Body {
    user: mongoose.Document<unknown, any, IUser> &
      IUser & {
        _id: mongoose.Types.ObjectId;
      };
    [key: string]: any;
  }
}

export {};
