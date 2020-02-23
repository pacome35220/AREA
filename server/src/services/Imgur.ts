import Axios from 'axios';

import { AreaService } from './Service';

var previousCommentsNb: number = 0;

const ifYouWroteTenComments = async (
    reactionType: 'generic' | 'specific',
    actionAccessToken: string,
    registerTimestamp: number
) => {
    const axios = Axios.create({
        baseURL: 'https://api.imgur.com/3',
        headers: {
            Authorization: `Bearer ${actionAccessToken}`
        }
    });
    const { data } = await axios.get(`/account/me/comments/count`);
    const nbcomments = parseInt(data);

    if (nbcomments === previousCommentsNb) {
        return;
    }
    previousCommentsNb = nbcomments;
    if (nbcomments > 0 && nbcomments % 10 == 0) {
        console.log(
            `Imgur action ifYouWroteTenComments ${reactionType} response ok`
        );
        if (reactionType === 'specific') {
            return nbcomments;
        }
        if (reactionType === 'generic') {
            return `You wrote 10 more comments on Imgur, go to work !`;
        }
    }
    console.log('Imgur action ifYouWroteTenComments no trigger');
    return null;
};

const pushAnImage = async (actionAccessToken: string, data: any) => {
    const axios = Axios.create({
        baseURL: 'https://api.imgur.com/3',
        headers: {
            Authorization: `Bearer ${actionAccessToken}`
        }
    });
    const response = await axios.post('/image', {
        title: 'You wrote 10 more comments on Imgur, go to work !',
        image: 'https://i.imgur.com/KTUAUrc.jpg'
    });
    console.log(`Imgur trigger specificReaction ${response.statusText}`);
};

export const Imgur: AreaService = {
    serviceName: 'Imgur',
    areas: [
        {
            areaId: 0,
            action: ifYouWroteTenComments,
            specificReaction: pushAnImage
        }
    ]
};
