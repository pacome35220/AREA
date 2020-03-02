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

export const removeGenericArea = async (
    req: Request,
    res: ExtendedResponse,
    next: NextFunction
) => {
    try {
        const { user } = res.locals;
        const { intervalId } = req.params;

        if (!intervalId) {
            return res.status(400).send('intervalId is missing.');
        }
        if (user.genericAreas) {
            const toRemove = user.genericAreas.find(
                genericArea => genericArea.intervalId === intervalId
            );
            if (toRemove) {
                await user.removeGenericArea(toRemove);
            } else {
                return res
                    .status(400)
                    .send(
                        "intervalId refers to a genericArea that doesn't exist."
                    );
            }
        }

        // send OK
        return res.sendStatus(200);
    } catch (err) {
        return next(err);
    }
};
