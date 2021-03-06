import Axios from 'axios';

import { AreaService } from './Service';

const ifYourVideosHasMoreThan1kLikes = async (
    reactionType: 'generic' | 'specific',
    actionAccessToken: string,
    registerTimestamp: number
) => {
    const axios = Axios.create({
        baseURL: 'https://www.googleapis.com/youtube/v3/',
        headers: {
            Authorization: `Bearer ${actionAccessToken}`
        }
    });
    const { data } = await axios.get(`videos`);

    for (let video of data.items) {
        if (video.statistics.viewCount > 1000) {
            console.log(
                `YouTube action ifYourVideosHasMoreThan1kLikes ${reactionType} response ok`
            );
            if (reactionType === 'specific') {
                return video.statistic.viewCount + ` (id=${video.id})`;
            }
            if (reactionType === 'generic') {
                return (
                    `You have more than 1000 views on ${video.snippet.title}` +
                    `(id = ${video.id})` +
                    ', good job !'
                );
            }
        }
    }
    console.log('YouTube action ifYourVideosHasMoreThan1kLikes not triggered');
    return null;
};

const aCommentIsPostOnVideo = async (actionAccessToken: string, data: any) => {
    var regex = new RegExp(/id=([^\)]*)/);
    var youtubeKey = '16d5ca0a-267b-43c2-ab71-fe0418a8ad2f';

    const axios = Axios.create({
        baseURL: 'https://www.googleapis.com/youtube/v3/',
        headers: {
            Authorization: `Bearer ${actionAccessToken}`
        }
    });

    const sendMessage = await axios.post(
        'messcommentThreads?part=snippet&key' + youtubeKey,
        {
            videoId: regex.exec(data),
            topLevelComment: data
        }
    );
    console.log('YouTube genericeReaction status: ', sendMessage.status);
};

export const YouTube: AreaService = {
    serviceName: 'YouTube',
    areas: [
        {
            areaId: 0,
            action: ifYourVideosHasMoreThan1kLikes,
            specificReaction: aCommentIsPostOnVideo
        }
    ],

    genericReaction: async (accessToken: string, message: string) => {
        var regex = new RegExp(/id=([^\)]*)/);
        var youtubeKey = '16d5ca0a-267b-43c2-ab71-fe0418a8ad2f';

        const axios = Axios.create({
            baseURL: 'https://www.googleapis.com/youtube/v3/',
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });

        const sendComment = await axios.post(
            'messcommentThreads?part=snippet&key' + youtubeKey,
            {
                videoId: regex.exec(message),
                topLevelComment: message
            }
        );
        console.log('YouTube genericeReaction status: ', sendComment.status);
    }
};
