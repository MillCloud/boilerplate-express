import { APP_API_ROUTER_PREFIX, APP_API_ROUTER_VERSION } from '@/constants';
import { Router } from 'express';

// export const normalizePath = (path: string) => path.replace(/\/+/g, '/').replace(/\/+$/, '');

export const normalizePath = (path: string) => path.replace(/\/+/g, '/');

export const getPath = (routerBase: string) =>
  normalizePath(`/${APP_API_ROUTER_PREFIX}/${APP_API_ROUTER_VERSION}/${routerBase}`);

export const getFullPath = (routerBase: string, routePath: string) =>
  normalizePath(`/${APP_API_ROUTER_PREFIX}/${APP_API_ROUTER_VERSION}/${routerBase}/${routePath}`);

export const addRoutes = (controller: IController, router: Router) => {
  Object.entries(controller).forEach(([, v]) => {
    v.methods.forEach((method) => {
      router[method](normalizePath(`/${v.path}`), ...v.middlewares, v.function);
    });
  });
};

export const generateRouter = (controller: IController) => {
  const router = Router();
  addRoutes(controller, router);
  return router;
};
