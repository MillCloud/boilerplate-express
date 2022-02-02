import mongoose from 'mongoose';
import { APP_DB_URI } from '@/constants';
import pc from 'picocolors';
import { logger } from '@/middlewares/logger';

export const connectDb = async () => {
  await mongoose
    .connect(APP_DB_URI)
    .then(() => {
      logger.info(pc.cyan(`${APP_DB_URI} is connected.`));
    })
    .catch((error) => {
      logger.error(error?.message ?? error);
      process.exit(1);
    });
};

export const disconnectDb = async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
};
