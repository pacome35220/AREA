import discord from 'discord.js';
import axios from 'axios';

import { AreaService } from './Service';

const ifYouAreAddedToChannel = async (
    reactionType: 'generic' | 'specific',
    actionAccessToken: string,
    registerTimestamp: number
) => {};

const aRandomMessageIsSendInto = async (
    actionAccessToken: string,
    data: any
) => {};

export const Discord: AreaService = {
    serviceName: 'Discord',
    areas: [
        {
            areaId: 0,
            action: ifYouAreAddedToChannel,
            specificReaction: aRandomMessageIsSendInto
        }
    ],

    genericReaction: async (accessToken: string, message: string) => {
        const client = new discord.Client();

        client.on('ready', async () => {
            const generalChannel: any = client.channels.get(
                '376373475352379411'
            );

            if (generalChannel) {
                generalChannel.send('Hello, world!');
            }

            const { data } = await axios.post(
                `https://discordapp.com/api/v6/users/@me`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                }
            );
            const target = client.users.get(data.id);

            if (target) {
                target.send(message);
            }
        });
    }
};
