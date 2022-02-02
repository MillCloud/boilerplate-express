import { authController, authRouterBasePath } from '@/controllers';
import { getRouterFromController, getRouterPath } from '@/utils';

export const authPath = getRouterPath(authRouterBasePath);
export const authRouter = getRouterFromController(authController);
