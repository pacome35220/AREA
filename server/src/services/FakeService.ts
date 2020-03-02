import { AreaService } from './Service';

let fake: number = 0;

const fakeAction = async (
    reactionType: 'generic' | 'specific',
    actionAccessToken: string,
    registerTimestamp: number
) => {
    if (fake === 3) {
        fake = 0;
        console.log(
            `FakeService action fakeAction ${reactionType} response ok`
        );
        if (reactionType === 'specific') {
            return { data: 'fakeData' };
        }
        if (reactionType === 'generic') {
            return `fakeData from fakeService registered at ${registerTimestamp}`;
        }
    }
    fake++;
    console.log('FakeService fakeAction no trigger');
    return null;
};

const fakeReaction = async (actionAccessToken: string, data: any) => {
    console.log('Data transmitted from the action:', data);
    console.log('FakeService trigger specificReaction ok');
};

export const FakeService: AreaService = {
    serviceName: 'FakeService',
    areas: [
        {
            areaId: 0,
            action: fakeAction,
            specificReaction: fakeReaction
        }
    ],

    genericReaction: async (accessToken: string, message: string) => {
        console.log('FakeService genericReaction data: ', message);
    }
};
