import { Router } from 'express';

import { signup, getProfile, deleteProfile } from '../controllers/user';
import { saveUserBasicAuthHeader, saveUserFromDatabase } from '../middlewares';

const router = Router();

router.post('/user/signup', saveUserBasicAuthHeader, signup);

router.get(
    '/user/me',
    saveUserBasicAuthHeader,
    saveUserFromDatabase,
    getProfile
);
router.delete(
    '/user/me',
    saveUserBasicAuthHeader,
    saveUserFromDatabase,
    deleteProfile
);

export default router;
