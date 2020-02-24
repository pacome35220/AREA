import axios from 'axios';

import { AreaService } from './Service';
import { Message } from 'discord.js';

const ifASpecificMessageisSend = async (
    reactionType: 'generic' | 'specific',
    actionAccessToken: string,
    registerTimestamp: number
) => {
    if (reactionType == 'specific') {
        console.log(
            `Discord action ifASpecificMessageIsSend ${reactionType} response ok`
        );
        return "L'Area te ping";
    }
    if (reactionType == 'generic') {
        return "L'Area t'envoie son action générique";
    }
    console.log('LinkedIn action ifASpecificMessageIsSend not triggered');
    return null;
};

const aRandomMessageIsSendInto = async (
    actionAccessToken: string,
    data: any
) => {
    var date = new Date();

    const req = await axios.get(`https://api.linkedin.com/v2/me`, {
        headers: {
            Authorization: `Bearer ${actionAccessToken}`
        }
    });

    const publication = await axios.post(
        `https://api.linkedin.com/v2/people/id=${req.data.id}/publications`,
        {
            headers: {
                Authorization: `Bearer ${actionAccessToken}`
            },
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
                        rawText: data
                    },
                    fr_FR: {
                        rawText: data
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
            action: ifASpecificMessageisSend,
            specificReaction: aRandomMessageIsSendInto
        }
    ],

    genericReaction: async (accessToken: string, message: string) => {
        const data = await axios.get(`https://api.linkedin.com/v2/me`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        var id = data.data.id;

        const sendMessage = await axios.post(
            'https://api.linkedin.com/v2/messages',
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
                recipients: ['urn:li:person:E0IRilJEIc', 'urn:li:person:' + id],
                subject: 'Area Generic Reaction',
                body: message,
                messageType: 'MEMBER_TO_MEMBER'
            }
        );
        console.log('LinkedIn genericeReaction status: ', sendMessage.status);
    }
};
