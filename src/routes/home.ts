import { homeController, homeRouterBasePath } from '@/controllers';
import { getRouterFromController, getRouterPath } from '@/utils';

export const homePath = getRouterPath(homeRouterBasePath);
export const homeRouter = getRouterFromController(homeController);
