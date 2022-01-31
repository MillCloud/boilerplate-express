import { Router } from 'express';
import { homeController } from '@/controllers';

export const base = '/';
const router = Router();

router.get('/', homeController.get);

router.post('/', homeController.post);

export { router };
