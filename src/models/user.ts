import mongoose from 'mongoose';
import { userSchema } from '../schemas';

export const UserModel = mongoose.model('User', userSchema);
