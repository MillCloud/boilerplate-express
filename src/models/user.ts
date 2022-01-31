/* eslint-disable no-param-reassign */
import mongoose from 'mongoose';

export const userSchema = new mongoose.Schema<IUser>({
  username: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

userSchema.set('toJSON', {
  transform: (document, value) => {
    value.id = value._id.toString();
    delete value._id;
    delete value.__v;
  },
});

export const UserModel = mongoose.model('User', userSchema);
/* eslint-enable no-param-reassign */
