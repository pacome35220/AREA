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
                    areas: [
                        [
                            'If you have 10 more likes on a photo ',
                            ' a comment is posted on your photo.'
                        ]
                    ],
                    isGenericReaction: true
                },
                {
                    name: 'Imgur',
                    areas: [
                        [
                            'If you wrote 10 more comments,',
                            ' a special picture is post on your account.'
                        ]
                    ],
                    isGenericReaction: false
                },
                {
                    name: 'Office365',
                    areas: [
                        [
                            'If you have 10 more mails, ',
                            ' you get an email that says your inbox looks like a trash.'
                        ]
                    ],
                    isGenericReaction: true
                }
            ]
        }
    };

    res.status(200).json(about);
});

export default router;
