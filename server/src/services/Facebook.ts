import Axios from 'axios';

import { AreaService } from './Service';

const ifYourPhotoHas10MoreLikes = async (
    reactionType: 'generic' | 'specific',
    actionAccessToken: string,
    registerTimestamp: number
) => {
    const axios = Axios.create({
        baseURL: 'https://graph.facebook.com/v6.0/',
        headers: {
            Authorization: `Bearer ${actionAccessToken}`
        }
    });
    const { data } = await axios.get(`me`);

    var id = data.id;

    const { photoRequest } = await axios.get(`${id}/photos`);

    for (let photo of photoRequest.data) {
        const { pictureStatRequest } = await axios.get(`${photo.id}/likes`);

        if (
            pictureStatRequest.data.totalCount > 0 &&
            pictureStatRequest.data.totalCount % 10 == 0
        ) {
            console.log(
                `Facebook action ifYourPhotoHas10MoreLikes ${reactionType} response ok`
            );
            if (reactionType === 'specific') {
                return pictureStatRequest.data.totalCount + ` (id=${photo.id})`;
            }
            if (reactionType === 'generic') {
                return (
                    `You have 10 more likes on (id = ${photo.id})` +
                    ", you're popular!"
                );
            }
        }
    }
    console.log('YouTube action ifYourPhotoHas10MoreLikes not triggered');
    return null;
};

const aCommentIsPostedOnPicture = async (
    actionAccessToken: string,
    data: any
) => {
    var regex = new RegExp(/id=([^\)]*)/);

    const axios = Axios.create({
        baseURL: 'https://graph.facebook.com/v6.0/',
        headers: {
            Authorization: `Bearer ${actionAccessToken}`
        }
    });

    const sendMessage = await axios.post(regex.exec(data) + `message=${data}`);
    console.log('Facebook genericeReaction status: ', sendMessage.status);
};

export const Facebook: AreaService = {
    serviceName: 'Facebook',
    areas: [
        {
            areaId: 0,
            action: ifYourPhotoHas10MoreLikes,
            specificReaction: aCommentIsPostedOnPicture
        }
    ],

    genericReaction: async (accessToken: string, message: string) => {
        var regex = new RegExp(/id=([^\)]*)/);

        const axios = Axios.create({
            baseURL: 'https://graph.facebook.com/v6.0/',
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        const sendComment = await axios.post(
            regex.exec(message) + `message=${message}`
        );
        console.log('YouTube genericeReaction status: ', sendComment.status);
    }
};
