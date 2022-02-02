import { Request, Response } from 'express';

export const homeRouterBase = '/';

export const homeController: TController = [
  {
    path: '/',
    methods: ['get'],
    middlewares: [],
    function: async (request: Request, response: Response) => {
      response.json({
        message: 'Hello Express! This is a GET response.',
      });
    },
  },
  {
    path: '/',
    methods: ['get'],
    middlewares: [],
    function: async (request: Request, response: Response) => {
      response.json({
        message: 'Hello Express! This is a POST response.',
      });
    },
  },
];
