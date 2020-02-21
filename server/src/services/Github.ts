import Axios from 'axios';

import { AreaService } from './Service';

const ifYouPushNewBranch = async (
    reactionType: 'generic' | 'specific',
    actionAccessToken: string,
    registerTimestamp: number
) => {
    const axios = Axios.create({
        baseURL: 'https://api.github.com',
        headers: {
            Authorization: `token ${actionAccessToken}`
        }
    });

    const user = await axios.get('/user');
    const events = await axios.get(`/users/${user.data.login}/events`);

    for (const event of events.data) {
        if (
            event.type === 'CreateEvent' &&
            event.payload.ref_type === 'branch' &&
            Date.parse(event.created_at) > registerTimestamp
        ) {
            console.log('ifYouPushNewBranch', `${reactionType} response ok`);
            if (reactionType === 'generic') {
                return `${event.actor.login} create branch ${event.payload.ref} on ${event.repo.name} at ${event.created_at}`;
            }
            if (reactionType === 'specific') {
                return event;
            }
        }
    }
    console.log('ifYouPushNewBranch', 'null');
    return null;
};

const createPullRequestFromBranch = async (
    actionAccessToken: string,
    data: any
) => {
    const axios = Axios.create({
        baseURL: 'https://api.github.com',
        headers: {
            Authorization: `token ${actionAccessToken}`
        }
    });
    const response = await axios.post(`/repos/${data.repo.name}/pulls`, {
        title: `PR name`,
        head: data.payload.ref,
        base: data.payload.master_branch
    });
    console.log(`trigger github specificReaction`, response.statusText);
};

export const Github: AreaService = {
    serviceName: 'Github',
    areas: [
        {
            areaId: 0,
            action: ifYouPushNewBranch,
            specificReaction: createPullRequestFromBranch
        }
    ]
};
