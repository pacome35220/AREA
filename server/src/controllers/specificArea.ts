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

export const removeSpecificArea = async (
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
        if (user.specificAreas) {
            const toRemove = user.specificAreas.find(
                specificArea => specificArea.intervalId === intervalId
            );
            if (toRemove) {
                await user.removeSpecificArea(toRemove);
            } else {
                return res
                    .status(400)
                    .send(
                        "intervalId refers to a specificArea that doesn't exist."
                    );
            }
        }

        // send OK
        return res.sendStatus(200);
    } catch (err) {
        return next(err);
    }
};
