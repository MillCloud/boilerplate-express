import mongoose from 'mongoose';
import pc from 'picocolors';
import { APP_DB_URI } from './constants';
import { logger } from './middlewares/logger';

mongoose
  .connect(APP_DB_URI)
  .then(() => {
    logger.info(pc.cyan(`${APP_DB_URI} is connected.`));
  })
  .catch((error) => {
    logger.error(error?.message ?? error);
    process.exit(1);
  });

mongoose.connection.on('disconnected', (error) => {
  logger.error(error?.message ?? error);
  process.exit(1);
});
