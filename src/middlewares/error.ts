import { ErrorRequestHandler } from 'express';
import statuses from 'statuses';

export const errorMiddleware: ErrorRequestHandler = (error, request, response, next) => {
  try {
    const status = error?.status ?? 500;
    const code = statuses(status);
    const message = error?.message ?? 'Something went wrong.';
    response.status(status).json({ code, message });
  } catch (error_) {
    next(error_);
  }
};
