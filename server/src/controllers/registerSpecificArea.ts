import { Request, Response, NextFunction } from 'express';
import auth from 'basic-auth';

import User from '../models/User';
import githubService from '../services/Github';

export const registerSpecificArea = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        // Check if Authorization header is present.
        const credentials = auth(req);

        if (!credentials) {
            res.setHeader('WWW-Authenticate', 'Basic realm="AREA-server"');
            return res
                .status(401)
                .send('Missing Authorization header with Basic');
        }

        // Check if Authorization header (email:password) is valid.
        const { name, pass } = credentials; // name is an email

        // Get user profile from database.
        const user = await User.findOne({
            where: { email: name }
        });

        if (!user || user.password !== pass) {
            return res
                .status(403)
                .send(
                    'Email or password does not match, or the account with this email does not exist'
                );
        }

        const { serviceName, areaId, actionAccessToken } = req.body;
        // code here
        console.log(serviceName, areaId, actionAccessToken);

        if (serviceName === 'Github') {
            githubService.registerSpecificAREA(
                user,
                serviceName,
                parseInt(areaId),
                actionAccessToken
            );
        }

        // send OK
        return res.status(200).send('OK');
    } catch (err) {
        return next(err);
    }
};
