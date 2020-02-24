import { Request, NextFunction } from 'express';

import { registerGenericAREA } from '../services/Service';
import { ExtendedResponse } from '../types/Response';

export const registerGenericArea = async (
    req: Request,
    res: ExtendedResponse,
    next: NextFunction
) => {
    try {
        const { user } = res.locals;
        const {
            actionServiceName,
            actionId,
            actionAccessToken,
            reactionServiceName,
            reactionAccessToken
        } = req.body;

        console.log(
            actionServiceName,
            actionId,
            actionAccessToken,
            reactionServiceName,
            reactionAccessToken
        );

        const data = await registerGenericAREA(
            user,
            actionServiceName,
            parseInt(actionId),
            actionAccessToken,
            reactionServiceName,
            reactionAccessToken
        );

        // send OK
        return res.status(200).json(data);
    } catch (err) {
        return next(err);
    }
};
