import { homeController, homeRouterBase } from '@/controllers';
import { generateRouter, getPath } from '@/utils';

export const homePath = getPath(homeRouterBase);
export const homeRouter = generateRouter(homeController);
