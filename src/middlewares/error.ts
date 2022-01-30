import { ErrorRequestHandler } from 'express';

export const errorMiddleware: ErrorRequestHandler = (error, request, response, next) => {
  try {
    const status = error?.status ?? 500;
    const message = error?.message ?? 'Something went wrong.';
    response.status(status).json({ message });
  } catch (error_) {
    next(error_);
  }
};
