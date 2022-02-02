import { APP_API_ROUTER_PREFIX, APP_API_ROUTER_VERSION } from '@/constants';
import { Router } from 'express';

// export const normalizeRoutePath = (path: string) => path.replace(/\/+/g, '/').replace(/\/+$/, '');

export const normalizeRoutePath = (path: string) => path.replace(/\/+/g, '/');

export const getRouterPath = (routerBasePath = '') =>
  normalizeRoutePath(`/${APP_API_ROUTER_PREFIX}/${APP_API_ROUTER_VERSION}/${routerBasePath}`);

export const getRoutePath = (routerBasePath = '', routeBasePath: string = '') =>
  normalizeRoutePath(
    `/${APP_API_ROUTER_PREFIX}/${APP_API_ROUTER_VERSION}/${routerBasePath}/${routeBasePath}`,
  );

export const addRoutes = (controller: IController, router: Router) => {
  Object.entries(controller).forEach(([, v]) => {
    v.methods.forEach((method) => {
      router[method](normalizeRoutePath(`/${v.path}`), ...v.middlewares, v.function);
    });
  });
};

export const getRouterFromController = (controller: IController) => {
  const router = Router();
  addRoutes(controller, router);
  return router;
};
