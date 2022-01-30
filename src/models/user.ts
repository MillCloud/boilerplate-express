import mongoose from 'mongoose';
import { userSchema } from '../schemas';

export const User = mongoose.model('User', userSchema);
