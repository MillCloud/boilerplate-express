import mongoose from 'mongoose';

export const authSchema = new mongoose.Schema<IAuth>({
  token: String,
  userId: { type: mongoose.Types.ObjectId, required: true },
  password: { type: String, required: true },
  expiredAt: { type: Date, required: true },
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

export const AuthModel = mongoose.model<IAuth>('Auth', authSchema);
