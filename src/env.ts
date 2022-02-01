import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import path from 'path';
import fs from 'fs';
import { APP_ENVS } from './constants';

APP_ENVS.map((fileName) => path.resolve(process.cwd(), fileName))
  .filter((filePath) => fs.existsSync(filePath))
  .forEach((filePath) => dotenvExpand.expand(dotenv.config({ path: filePath, override: true })));
