import { Router } from 'express';

import { saveUserBasicAuthHeader, saveUserFromDatabase } from '../middlewares';

import { registerSpecificArea } from '../controllers/registerSpecificArea';
import { registerGenericArea } from '../controllers/registerGenericArea';

const router = Router();

router.post(
    '/register-specific-area',
    saveUserBasicAuthHeader,
    saveUserFromDatabase,
    registerSpecificArea
);
router.post(
    '/register-generic-area',
    saveUserBasicAuthHeader,
    saveUserFromDatabase,
    registerGenericArea
);

export default router;
