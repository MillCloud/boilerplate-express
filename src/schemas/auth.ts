/* eslint-disable no-param-reassign */
import mongoose from 'mongoose';

export const authSchema = new mongoose.Schema<IAuth>({
  token: String,
  userId: { type: mongoose.Types.ObjectId, required: true },
  password: { type: String, required: true },
  expiredAt: { type: Date, required: true },
});

authSchema.set('toJSON', {
  transform: (document, value) => {
    value.id = value._id.toString();
    delete value._id;
    delete value.__v;
  },
});
/* eslint-enable no-param-reassign */
