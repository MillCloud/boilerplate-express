import { ErrorRequestHandler } from 'express';
import statuses from 'statuses';

export const errorMiddleware: ErrorRequestHandler = (error, request, response, next) => {
  try {
    const errorStatus = error?.status ?? 500;
    const errorCode = statuses(errorStatus);
    const errorMessage = (error?.message ?? 'Something went wrong.').trim();
    const errorOverride = error?.override ?? false;

    const message = (errorOverride ? errorMessage : `${errorCode}. ${errorMessage}.`).replace(
      /\.+/g,
      '.',
    );
    response.status(errorStatus).json({ code: errorCode, message });
  } catch (error_) {
    next(error_);
  }
};
