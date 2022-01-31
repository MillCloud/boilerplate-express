import mongoose from 'mongoose';
import { authSchema } from '../schemas';

export const AuthModel = mongoose.model<IAuth>('Auth', authSchema);
