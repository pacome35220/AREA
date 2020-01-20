import { Router } from 'express';
import { signup, getProfile } from '../controllers/user';

const router = Router();

router.post('/user/signup', signup);

router.get('/user/me', getProfile);
// router.put('/user/me', );

export default router;
