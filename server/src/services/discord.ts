// const Discord = require('discord.js');
// const client = new Discord.Client();

// client.on('ready', () => {
//     console.log(`Logged in as ${client.user.tag}!`);
// });

// function discordMessage(accessToken: string, message: string) {
//     client.on('ready', () => {
//         var generalChannel = client.channels.get('376373475352379411');
//         generalChannel.send('Hello, world!');

//         const { data } = axios.post(`https://discordapp.com/api/v6/users/@me`, {
//             headers: {
//                 Authorization: `Bearer {{accessToken}}`
//             }
//         });
//         const userID = qs.parse(data).id;

//         client.users.get(userID).send(message);
//     });
// }
