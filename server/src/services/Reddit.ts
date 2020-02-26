import Axios from 'axios';

import { AreaService } from './Service';

var previousnbUnreadMessages: number = 0;

const ifIHaveTooManyUnreadMessages = async (
    reactionType: 'generic' | 'specific',
    actionAccessToken: string,
    registerTimestamp: number
) => {
    const axios = Axios.create({
        baseURL: 'https://www.reddit.com/api',
        headers: {
            Authorization: `Bearer ${actionAccessToken}`
        }
    });
    const { data } = await axios.get('/mod/conversations/unread/count');
    const nbUnreadMessages = parseInt(data);

    if (nbUnreadMessages === previousnbUnreadMessages) {
        return;
    }
    previousnbUnreadMessages = nbUnreadMessages;
    if (nbUnreadMessages > 0 && nbUnreadMessages % 10 == 0) {
        console.log(
            `Imgur action ifYouWroteTenComments ${reactionType} response ok`
        );
        if (reactionType === 'specific') {
            return nbUnreadMessages;
        }
        if (reactionType === 'generic') {
            return `You wrote 10 more comments on Imgur, go to work !`;
        }
    }
    console.log('Reddit action ifIHaveTooManyUnreadMessages no trigger');
    return null;
};

const createLive = async (actionAccessToken: string, data: any) => {
    //Submit links and comments from my account.
    const axios = Axios.create({
        baseURL: 'https://www.reddit.com/api',
        headers: {
            Authorization: `Bearer ${actionAccessToken}`
        }
    });
    //todo check data conversationIds	A comma-separated list of items
    //    var unreadMessages = await axios.get('/message/unread');
    //note: get modash         await axios.get('/me.json')

    var obj = {
        description:
            'we have created this live because you got to many unread messages',
        nsfw: true,
        resources: '',
        title: "AREA's reaction"
    };
    const response = await axios.post('/live/create', obj);
    console.log(`Reddit trigger specificReaction ${response.statusText}`);
};

export const Reddit: AreaService = {
    serviceName: 'Reddit',
    areas: [
        {
            areaId: 0,
            action: ifIHaveTooManyUnreadMessages,
            specificReaction: createLive
        }
    ]
};
