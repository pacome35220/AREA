import { Request, Response, NextFunction } from 'express';
import auth from 'basic-auth';
import validator from 'validator';

import User from '../models/User';

export const signup = async (
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

        if (!validator.isEmail(name)) {
            return res.status(400).send('Email is invalid.');
        }
        if (pass.length < 6) {
            return res.status(400).send('Password is too short.');
        }

        // Check if firstName and familyName keys are present in req.body
        const { firstName, familyName } = req.body;

        if (!firstName) {
            return res.status(400).send('First name is missing.');
        }
        if (!familyName) {
            return res.status(400).send('Family name is missing.');
        }

        // Check if user in not already in database.
        const user = await User.findOne({
            where: { email: name }
        });

        if (user) {
            return res.status(409).send('User already exist');
        }

        // Store valid user in database
        const newUser = await User.create({
            firstName,
            familyName,
            email: name,
            password: pass
        });
        return res.status(200).json(newUser);
    } catch (err) {
        return next(err);
    }
};

export const getProfile = async (
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

        // keep password safe
        delete user.password;

        // Send his JSON profile to user
        return res.status(200).json(user);
    } catch (err) {
        return next(err);
    }
};
