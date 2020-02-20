const SetInterval = require('set-interval');

import User from '../models/User';

export interface Area {
    areaId: number;
    action: (
        reactionType: 'generic' | 'specific',
        actionAccessToken: string,
        registerTimestamp: number
    ) => Promise<any>;
    specificReaction: (actionAccessToken: string, data: any) => Promise<void>;
}

export class Service {
    private areas: Area[];

    constructor(areas: Area[]) {
        this.areas = areas;
    }

    async registerSpecificAREA(
        user: User,
        serviceName: string,
        areaId: number,
        actionAccessToken: string
    ) {
        const selectedArea = this.areas.find(area => area.areaId === areaId);
        const registerTimestamp = Date.now();

        if (!selectedArea) {
            throw `areaId ${areaId} don't exist`;
        }

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
                        .then(() =>
                            console.log(`Trigger Github reaction success`)
                        )
                        .catch(() =>
                            console.log(`Trigger Github reaction error`)
                        );
                }
            },
            1000,
            registerTimestamp.toString()
        );

        await user.createSpecificArea({
            serviceName,
            areaId,
            actionAccessToken,
            intervalId: registerTimestamp.toString()
        });
    }

    async registerGenericAREA(
        user: User,
        actionServiceName: string,
        actionId: number,
        actionAccessToken: string,
        reactionServiceName: string,
        reactionAccessToken: string
    ) {
        const selectedArea = this.areas.find(area => area.areaId === actionId);
        const registerTimestamp = Date.now();

        if (!selectedArea) {
            throw `actionId ${actionId} don't exist`;
        }

        SetInterval.start(
            async () => {
                const data = await selectedArea.action(
                    'generic',
                    actionAccessToken,
                    registerTimestamp
                );

                if (data) {
                    // TODO
                    switch (reactionServiceName) {
                        case 'Discord':
                            // await discord.genericReaction(reactionAccessToken)
                            break;
                        default:
                            break;
                    }
                    console.log(
                        'futur forêt de if pour savoir quel service réaction on utilise.'
                    );
                }
            },
            1000,
            registerTimestamp.toString()
        );

        await user.createGenericArea({
            actionServiceName,
            actionId,
            actionAccessToken,
            reactionServiceName,
            reactionAccessToken,
            intervalId: registerTimestamp.toString()
        });
    }
}
