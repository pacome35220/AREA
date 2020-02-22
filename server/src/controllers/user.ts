import { Request, NextFunction } from 'express';
import validator from 'validator';

import { ExtendedResponse } from '../types/Response';

import User from '../models/User';

export const signup = async (
    req: Request,
    res: ExtendedResponse,
    next: NextFunction
) => {
    try {
        // Check if Authorization header (email:password) is valid.
        const { name, pass } = res.locals.credentials; // name is an email

        if (!validator.isEmail(name)) {
            return res.status(400).send('Email is invalid.');
        }
        if (pass.length < 6) {
            return res.status(400).send('Password is too short.');
        }

        // Check if firstName and lastName keys are present in req.body
        const { firstName, lastName } = req.body;

        if (!firstName) {
            return res.status(400).send('First name is missing.');
        }
        if (!lastName) {
            return res.status(400).send('Last name is missing.');
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
            lastName,
            email: name,
            password: pass
        });

        // keep password safe
        newUser.password = '';

        return res.status(200).json(newUser);
    } catch (err) {
        return next(err);
    }
};

export const getProfile = async (
    req: Request,
    res: ExtendedResponse,
    next: NextFunction
) => {
    try {
        const { user } = res.locals;

        // keep password safe
        user.password = '';

        // Send his JSON profile to user
        return res.status(200).json(user);
    } catch (err) {
        return next(err);
    }
};

export const deleteProfile = async (
    req: Request,
    res: ExtendedResponse,
    next: NextFunction
) => {
    try {
        const { user } = res.locals;

        // delete user from database
        await user.destroy();

        return res.status(200).end();
    } catch (err) {
        return next(err);
    }
};
