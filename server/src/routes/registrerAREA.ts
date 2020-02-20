import { Router } from 'express';
import { registerSpecificArea } from '../controllers/registerSpecificArea';
import { registerGenericArea } from '../controllers/registerGenericArea';

const router = Router();

router.post('/register-specific-area', registerSpecificArea);
router.post('/register-generic-area', registerGenericArea);

export default router;
