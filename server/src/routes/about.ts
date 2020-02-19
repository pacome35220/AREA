import express, { Request, Response } from 'express';

const router = express.Router();

interface AboutJSON {
    client: {
        host: string; // client ip
    };
    server: {
        current_time: number; // request timestamp
        services: {
            name: string; // service name
            areas: [string, string][]; // array of area (pair of action/reaction)
            isGenericReaction: boolean; // is this service able to receive text as generic reaction
        }[];
    };
}

router.get('/about.json', (req: Request, res: Response) => {
    const about: AboutJSON = {
        client: {
            host: req.ip
        },
        server: {
            current_time: Math.round(Date.now() / 1000),
            services: [
                {
                    name: 'Github',
                    areas: [
                        [
                            'If you push a new branch',
                            'a pull request from this branch to master is create.'
                        ]
                    ],
                    isGenericReaction: false
                },
                {
                    name: 'Discord',
                    areas: [
                        [
                            'If you are add to a channel',
                            'a random message is send into it.'
                        ]
                    ],
                    isGenericReaction: true
                },
                {
                    name: 'Facebook',
                    areas: [['TODO', 'TODO']],
                    isGenericReaction: true
                },
                {
                    name: 'Imgur',
                    areas: [['TODO', 'TODO']],
                    isGenericReaction: false
                },
                {
                    name: 'Office365',
                    areas: [['TODO', 'TODO']],
                    isGenericReaction: true
                }
            ]
        }
    };

    res.status(200).json(about);
});

export default router;
