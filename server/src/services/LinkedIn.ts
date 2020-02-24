import Axios from 'axios';

import { AreaService } from './Service';

var previousConnexionNb: number = 0;

const ifYouHaveTenMoreConnexions = async (
    reactionType: 'generic' | 'specific',
    actionAccessToken: string,
    registerTimestamp: number
) => {
    const axios = Axios.create({
        baseURL: 'https://api.linkedin.com/v2/',
        headers: {
            Authorization: `Bearer ${actionAccessToken}`
        }
    });
    const { data } = await axios.get(
        `connections?q=viewer&projection=(paging)`
    );
    const nbConnexion = data.paging.total;

    if (nbConnexion === previousConnexionNb) {
        return;
    }
    previousConnexionNb = nbConnexion;
    if (nbConnexion > 0 && nbConnexion % 10 == 0) {
        console.log(
            `LinkedIn action ifYouHaveTenMoreConnexions ${reactionType} response ok`
        );
        if (reactionType === 'specific') {
            return nbConnexion;
        }
        if (reactionType === 'generic') {
            return `You have 10 more connexions on LinkedIn, nice work !`;
        }
    }
    console.log('LinkedIn action ifYouWroteTenComments not triggered');
    return null;
};

const aRandomMessageIsSendInto = async (
    actionAccessToken: string,
    data: any
) => {
    var date = new Date();

    const req = await Axios.get(`https://api.linkedin.com/v2/me`, {
        headers: {
            Authorization: `Bearer ${actionAccessToken}`
        }
    });
    const axios = Axios.create({
        baseURL: 'https://api.linkedin.com/v2/',
        headers: {
            Authorization: `token ${actionAccessToken}`
        }
    });

    const publication = await axios.post(
        `people/id=${req.data.id}/publications`,
        {
            date: {
                month: date.getMonth(),
                year: date.getFullYear(),
                day: date.getDate()
            },
            name: {
                localized: {
                    en_US: 'Area LinkedIn Publication',
                    fr_FR: 'Area LinkedIn Publication'
                },
                preferredLocale: {
                    country: 'FR',
                    language: 'fr'
                }
            },
            description: {
                localized: {
                    en_US: {
                        rawText: `I've ${data} more connexions !!!`
                    },
                    fr_FR: {
                        rawText: `J'ai ${data} connexions en plus !!!`
                    }
                },
                preferredLocale: {
                    country: 'FR',
                    language: 'fr'
                }
            },
            publisher: {
                localized: {
                    en_US: 'Area',
                    fr_FR: 'Area'
                },
                preferredLocale: {
                    country: 'FR',
                    language: 'fr'
                }
            },
            url: 'https://area.marc0.fr/',
            authors: [
                {
                    memberId: 'urn:li:person:' + req.data.id
                }
            ]
        }
    );
    console.log(
        `LinkedIn trigerred a specificReaction with the message ${data}`
    );
    console.log('LinkedIn genericeReaction status: ', publication.status);
};

export const Discord: AreaService = {
    serviceName: 'LinkedIn',
    areas: [
        {
            areaId: 0,
            action: ifYouHaveTenMoreConnexions,
            specificReaction: aRandomMessageIsSendInto
        }
    ],

    genericReaction: async (accessToken: string, message: string) => {
        const data = await Axios.get(`https://api.linkedin.com/v2/me`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        var id = data.data.id;

        const axios = Axios.create({
            baseURL: 'https://api.linkedin.com/v2/',
            headers: {
                Authorization: `token ${accessToken}`
            }
        });

        const sendMessage = await axios.post('messages', {
            recipients: ['urn:li:person:' + id, 'urn:li:person:' + id],
            subject: 'Area Generic Reaction',
            body: message,
            messageType: 'MEMBER_TO_MEMBER'
        });
        console.log('LinkedIn genericeReaction status: ', sendMessage.status);
    }
};
