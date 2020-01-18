import { Router } from 'express';
import { signup } from '../controllers/auth';

const router = Router();

router.post('/user/signup', signup);

// router.get('/user/me', );
// router.put('/user/me', );

export default router;
