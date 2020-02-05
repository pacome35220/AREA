import { Router } from 'express';
import { signup, getProfile, deleteProfile } from '../controllers/user';

const router = Router();

router.post('/user/signup', signup);

router.get('/user/me', getProfile);
router.delete('/user/me', deleteProfile);

export default router;
