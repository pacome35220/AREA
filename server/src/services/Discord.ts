import discord from 'discord.js';
import axios from 'axios';

import { AreaService } from './Service';

var alreadyHandleEvent: number[] = [];

const ifASpecificMessageisSend = async (
    reactionType: 'generic' | 'specific',
    actionAccessToken: string,
    registerTimestamp: number
) => {
    if (reactionType == 'specific') {
        console.log(
            `Discord action ifASpecificMessageIsSend ${reactionType} response ok`
        );
        return 'Pong';
    }
    if (reactionType == 'generic') {
        return 'Tu es woassiste';
    }
    console.log('Discord action ifASpecificMessageIsSend not triggered');
    return null;
};

const aRandomMessageIsSendInto = async (
    actionAccessToken: string,
    data: any
) => {
    const client = new discord.Client();
    client.on('message', msg => {
        if (msg.content === 'ping') {
            if (alreadyHandleEvent.includes(msg.createdTimestamp)) {
                return;
            }
            alreadyHandleEvent.push(msg.createdTimestamp);
            msg.reply(data);
            console.log(
                `Discord trigerred a specificReaction with the message ${data}`
            );
        }
    });
    client.login('NjY2OTQxNDg4NTYyODMxMzgw.XlPf0Q.pwI22yqD6ZRcVAN6iNWFQCbA4bk');
};

export const Discord: AreaService = {
    serviceName: 'Discord',
    areas: [
        {
            areaId: 0,
            action: ifASpecificMessageisSend,
            specificReaction: aRandomMessageIsSendInto
        }
    ],

    genericReaction: async (accessToken: string, message: string) => {
        const client = new discord.Client();

        client.on('ready', async () => {
            const data = await axios.get(
                `https://discordapp.com/api/v6/users/@me`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                }
            );
            if (data) {
                const target = client.users.get(data.data.id);

                if (target) {
                    target.send(message);
                }
            }
        });
        client.login(
            'NjY2OTQxNDg4NTYyODMxMzgw.Xk1C6A.PphpBN20sCAn-LuX_8UqP2AdCeo'
        );
        console.log('Discord genericeReaction');
    }
};
