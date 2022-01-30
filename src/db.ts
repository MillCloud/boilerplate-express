import mongoose from 'mongoose';
import pc from 'picocolors';
import { DB_URI } from './constants';
import { logger } from './utils';

mongoose
  .connect(DB_URI)
  .then(() => {
    logger.info(pc.cyan(`${DB_URI} is connected.`));
  })
  .catch((error) => {
    logger.error(error?.message ?? error);
    // eslint-disable-next-line unicorn/no-process-exit
    process.exit(1);
  });

mongoose.connection.on('disconnected', (error) => {
  logger.error(error?.message ?? error);
  // eslint-disable-next-line unicorn/no-process-exit
  process.exit(1);
});
