import mongoose from 'mongoose';

export const userSchema = new mongoose.Schema({
  username: String,
  nickname: String,
  mobile: String,
  email: String,
  avatar: String,
  Birthday: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});
