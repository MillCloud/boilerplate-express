import mongoose from 'mongoose';

export const userSchema = new mongoose.Schema<IUser>({
  username: { type: String, required: true },
  role: { type: Number, required: true },
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
  transform: (document, result) => {
    result.id = result._id.toString();
    delete result._id;
    delete result.__v;
  },
});

export const UserModel = mongoose.model('User', userSchema);
