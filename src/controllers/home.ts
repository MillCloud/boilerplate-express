import { Request, Response } from 'express';

export const homeRouterBase = '/';

export const homeController: IController = {
  get: {
    path: '/',
    methods: ['get'],
    middlewares: [],
    function: async (request: Request, response: Response) => {
      response.json({
        message: 'Hello Express! This is a GET response.',
      });
    },
  },

  post: {
    path: '/',
    methods: ['post'],
    middlewares: [],
    function: async (request: Request, response: Response) => {
      response.json({
        message: 'Hello Express! This is a POST response.',
      });
    },
  },
};
