import { Request, Response } from 'express';

export const homeController = {
  get: async (request: Request, response: Response) => {
    response.json({
      message: 'Hello Express! This is a GET response.',
    });
  },

  post: async (request: Request, response: Response) => {
    response.json({
      message: 'Hello Express! This is a POST response.',
    });
  },
};
