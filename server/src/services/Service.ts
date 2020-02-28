const SetInterval = require('set-interval');

import User from '../models/User';

import { Discord } from './Discord';
import { Github } from './Github';
import { Imgur } from './Imgur';
import { Office365 } from './Office365';
import { Reddit } from './Reddit';
import { YouTube } from './Youtube';
import { LinkedIn } from './LinkedIn';

export interface Area {
    areaId: number;
    action: (
        reactionType: 'generic' | 'specific',
        actionAccessToken: string,
        registerTimestamp: number
    ) => Promise<any>;
    specificReaction: (actionAccessToken: string, data: any) => Promise<void>;
}

export interface AreaService {
    serviceName: string;

    areas: Area[];

    genericReaction?: (accessToken: string, message: string) => Promise<void>;
}

const areasServices: AreaService[] = [
    Github,
    Discord,
    Imgur,
    Office365,
    Reddit,
    YouTube,
    LinkedIn
];

export const registerSpecificAREA = async (
    user: User,
    serviceName: string,
    areaId: number,
    actionAccessToken: string
) => {
    // check if serviceName exists
    const selectedAreaService = areasServices.find(
        areasService => areasService.serviceName === serviceName
    );

    if (!selectedAreaService) {
        throw `serviceName ${serviceName} don't exist`;
    }

    // check if areaId exists in serviceName
    const selectedArea = selectedAreaService.areas.find(
        area => area.areaId === areaId
    );

    if (!selectedArea) {
        throw `areaId n°${areaId} in ${serviceName} don't exist`;
    }

    const registerTimestamp = Date.now();

    console.log('registerSpecificAREA', user.email, serviceName, areaId);

    // check each 5 seconds for action
    SetInterval.start(
        async () => {
            const data = await selectedArea.action(
                'specific',
                actionAccessToken,
                registerTimestamp
            );

            if (data) {
                selectedArea
                    .specificReaction(actionAccessToken, data)
                    .catch(error =>
                        console.log(
                            `${serviceName} specificReaction error: `,
                            error
                        )
                    );
            }
        },
        5000,
        registerTimestamp.toString()
    );

    // store area in database
    return await user.createSpecificArea({
        serviceName,
        areaId,
        actionAccessToken,
        intervalId: registerTimestamp.toString()
    });
};

export const registerGenericAREA = async (
    user: User,
    actionServiceName: string,
    actionId: number,
    actionAccessToken: string,
    reactionServiceName: string,
    reactionAccessToken: string
) => {
    // check if actionServiceName exists
    const selectedActionService = areasServices.find(
        areasService => areasService.serviceName === actionServiceName
    );

    if (!selectedActionService) {
        throw `actionServiceName ${actionServiceName} don't exist`;
    }

    // check if actionId exists in serviceName
    const selectedArea = selectedActionService.areas.find(
        area => area.areaId === actionId
    );

    if (!selectedArea) {
        throw `actionId n°${actionId} in ${actionServiceName} don't exist`;
    }

    // check if reactionServiceName exists
    const selectedReactionService = areasServices.find(
        areasService =>
            areasService.serviceName === reactionServiceName &&
            areasService.genericReaction !== undefined
    );

    if (!selectedReactionService) {
        throw `reactionServiceName ${reactionServiceName} don't exist or genericReaction not implemented`;
    }

    const registerTimestamp = Date.now();

    console.log(
        'registerGenericAREA',
        user.email,
        actionServiceName,
        actionId,
        reactionServiceName
    );

    // check each 5 seconds for action
    SetInterval.start(
        async () => {
            const data = await selectedArea.action(
                'generic',
                actionAccessToken,
                registerTimestamp
            );
            if (data && selectedReactionService.genericReaction) {
                await selectedReactionService
                    .genericReaction(reactionAccessToken, data)
                    .catch(error => {
                        console.log(
                            `${reactionServiceName} genericReaction error: `,
                            error
                        );
                    });
            }
        },
        5000,
        registerTimestamp.toString()
    );

    // store area in database
    return await user.createGenericArea({
        actionServiceName,
        actionId,
        actionAccessToken,
        reactionServiceName,
        reactionAccessToken,
        intervalId: registerTimestamp.toString()
    });
};
