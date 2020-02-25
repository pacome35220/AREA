import Axios from 'axios';

import { AreaService } from './Service';

var previousMailNb: number = 0;

const ifIHaveTooManyMails = async (
    reactionType: 'generic' | 'specific',
    actionAccessToken: string,
    registerTimestamp: number
) => {
    const axios = Axios.create({
        baseURL: 'https://graph.microsoft.com/v1.0',
        headers: {
            Authorization: `Bearer ${actionAccessToken}`
        }
    });
    const { data } = await axios.get('/me/mailfolders/inbox/messages?$top=20'); //todo change top
    const nbMail = Object.keys(data).length;

    if (nbMail === previousMailNb) {
        return;
    }
    previousMailNb = nbMail;
    if (nbMail > 0 && nbMail % 10 == 0) {
        console.log(
            `Imgur action ifYouWroteTenComments ${reactionType} response ok`
        );
        if (reactionType === 'specific') {
            return nbMail;
        }
        if (reactionType === 'generic') {
            return `You wrote 10 more comments on Office, go to work !`;
        }
    }
    console.log('Office action ifIHaveTooManyMails not triggered');
    return null;
};

const sendAMail = async (actionAccessToken: string, data: any) => {
    const axios = Axios.create({
        baseURL: 'https://graph.microsoft.com/v1.0',
        headers: {
            Authorization: `Bearer ${actionAccessToken}`
        }
    });
    // const { mail }  = await axios.get('/me/'); todo maybe i have to get my mail addr
    var obj = {
        Message: {
            Subject: 'Clean your inbox !',
            Body: {
                ContentType: 'Text',
                Content:
                    "We're here to warn you that your inbox is starting to be a real TRASH !!!"
            },
            ToRecipients: [
                {
                    EmailAddress: {
                        Address: 'me' //don't know if this sh#$ works
                    }
                }
            ]
        }
    };
    var response = axios.post('/me/sendmail', obj);
    console.log('Email response = ', response);
};

export const Office365: AreaService = {
    serviceName: 'Office365',
    areas: [
        {
            areaId: 0,
            action: ifIHaveTooManyMails,
            specificReaction: sendAMail
        }
    ]
};
