import { APP_API_ROUTER_PREFIX, APP_API_ROUTER_VERSION } from '@/constants';
import { Router } from 'express';

export const normalizePath = (path: string) => path.replace(/\/+/g, '/');

export const getPath = (routerBase: string) =>
  normalizePath(`/${APP_API_ROUTER_PREFIX}/${APP_API_ROUTER_VERSION}/${routerBase}`);

export const getFullPath = (routerBase: string, routePath: string) =>
  normalizePath(`/${APP_API_ROUTER_PREFIX}/${APP_API_ROUTER_VERSION}/${routerBase}/${routePath}`);

export const addRoutes = (controller: TController, router: Router) => {
  controller.forEach((item) => {
    item.methods.forEach((method) => {
      router[method](normalizePath(`/${item.path}`), ...item.middlewares, item.function);
    });
  });
};

export const generateRouter = (controller: TController) => {
  const router = Router();
  addRoutes(controller, router);
  return router;
};
