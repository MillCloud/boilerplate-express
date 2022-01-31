import mongoose from 'mongoose';

declare global {
  interface IAuth {
    token: string;
    userId: mongoose.Types.ObjectId;
    password: string;
    expiredAt: Date;
  }

  interface IUser {
    username: string;
    createdAt?: Date;
    updatedAt?: Date;
  }

  interface Body {
    user: mongoose.Document<unknown, any, IUser> &
      IUser & {
        _id: mongoose.Types.ObjectId;
      };
    [key: string]: any;
  }
}

export {};
