import { Request, Response, NextFunction } from 'express';
import { ValidationChain, validationResult, body } from 'express-validator';

export const locationValidationResult = validationResult.withDefaults({
  formatter: (error) => error.location,
});

export const messageValidationResult = validationResult.withDefaults({
  formatter: (error) => error.msg,
});

export const paramValidationResult = validationResult.withDefaults({
  formatter: (error) => error.param,
});

export const valueValidationResult = validationResult.withDefaults({
  formatter: (error) => error.value,
});

export const validate =
  (validations: ValidationChain[]) =>
  async (request: Request, response: Response, next: NextFunction) => {
    await Promise.all(validations.map((validation) => validation.run(request)));
    const errors = messageValidationResult(request);
    if (errors.isEmpty()) {
      next();
      return;
    }
    next({
      status: 400,
      message: errors.array()[0],
    });
  };

export const bodyUsernameValidationChain = body(
  'username',
  'Username must be a string between 4 and 20 characters long.',
)
  .isString()
  .isLength({ min: 4, max: 20 });

export const bodyPasswordValidationChain = body(
  'password',
  'Password must be a string between 8 and 20 characters long, including 1 lowercase, 1 uppercase, 1 number and 1 symbol at lease.',
)
  .isStrongPassword()
  .isLength({ min: 8, max: 20 });
