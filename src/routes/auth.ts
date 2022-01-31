import { Router } from 'express';
import { validate, bodyUsernameValidationChain, bodyPasswordValidationChain } from '@/utils';
import { authMiddleware } from '@/middlewares';
import { authController } from '@/controllers';

export const base = '/auth';
const router = Router();

router.post(
  '/sign-in',
  validate([bodyUsernameValidationChain, bodyPasswordValidationChain]),
  authController.signIn,
);

router.post(
  '/sign-up',
  validate([bodyUsernameValidationChain, bodyPasswordValidationChain]),
  authController.signUp,
);

router.post('/sign-out', authMiddleware, authController.signOut);

router.post('/renew', authMiddleware, authController.renew);

export { router };
