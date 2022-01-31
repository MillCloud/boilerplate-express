import rateLimit from 'express-rate-limit';

export const rateLimitMiddleware = rateLimit({
  windowMs: 1000,
  max: 5,
  message: {
    message: 'Too many requests, please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});
