import { Request, NextFunction } from 'express';

import { registerSpecificAREA } from '../services/Service';
import { ExtendedResponse } from '../types/Response';

export const registerSpecificArea = async (
    req: Request,
    res: ExtendedResponse,
    next: NextFunction
) => {
    try {
        const { user } = res.locals;
        const { serviceName, areaId, actionAccessToken } = req.body;

        console.log(serviceName, areaId, actionAccessToken);

        const data = await registerSpecificAREA(
            user,
            serviceName,
            parseInt(areaId),
            actionAccessToken
        );

        // send OK
        return res.status(200).json(data);
    } catch (err) {
        return next(err);
    }
};
