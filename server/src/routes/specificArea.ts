import { Router } from 'express';

import { saveUserBasicAuthHeader, saveUserFromDatabase } from '../middlewares';

import {
    registerSpecificArea,
    removeSpecificArea
} from '../controllers/specificArea';

const router = Router();

router.post(
    '/specific-area',
    saveUserBasicAuthHeader,
    saveUserFromDatabase,
    registerSpecificArea
);

router.delete(
    '/specific-area/:timestampId',
    saveUserBasicAuthHeader,
    saveUserFromDatabase,
    removeSpecificArea
);

export default router;
