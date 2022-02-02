import { authController, authRouterBase } from '@/controllers';
import { generateRouter, getPath } from '@/utils';

export const authPath = getPath(authRouterBase);
export const authRouter = generateRouter(authController);
