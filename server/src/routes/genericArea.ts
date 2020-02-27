import { Router } from 'express';

import { saveUserBasicAuthHeader, saveUserFromDatabase } from '../middlewares';

import {
    registerGenericArea,
    removeGenericArea
} from '../controllers/genericArea';

const router = Router();

router.post(
    '/generic-area',
    saveUserBasicAuthHeader,
    saveUserFromDatabase,
    registerGenericArea
);

router.delete(
    '/generic-area',
    saveUserBasicAuthHeader,
    saveUserFromDatabase,
    removeGenericArea
);

export default router;
