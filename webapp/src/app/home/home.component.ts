import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';

import axios from 'axios';

import { environment } from 'src/environments/environment';

import { AppAuthService } from '../services/app-auth.service';

import { getAccessTokenFromGithub } from '../services/github/github';
import { getAccessTokenFromDiscord } from '../services/discord/discord';
import { getAccessTokenFromFacebook } from '../services/facebook/facebook';
import { getAccessTokenFromImgur } from '../services/imgur/imgur';
import { getAccessTokenFromOffice365 } from '../services/office365/office365';
import { getAccessTokenFromYoutube } from '../services/youtube/youtube';
import { getAccessTokenFromLinkedIn } from '../services/linkedin/linkedin';

export interface Service {
    name: string;
    description: string;
    image: string;
    isGenericReaction: boolean;

    areas: [string, string][];

    authenticateAction: (service: Service) => Promise<string>;

    authorizeUrl: string;
    redirectUrl: string;
    accessUrl: string;
    clientId: string;
    clientSecret: string;
    scope?: string;
    responseType?: string;
}

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    services: Service[] = [
        {
            name: 'Github',
            description: "The world's leading software development platform",
            image: '../../assets/github.svg',
            isGenericReaction: false,

            areas: [
                [
                    'If you push a new branch',
                    'a PR to master is create with this branch.'
                ]
            ],

            authenticateAction: getAccessTokenFromGithub,

            authorizeUrl: 'https://github.com/login/oauth/authorize',
            redirectUrl: environment.redirectUrl,
            accessUrl: 'https://github.com/login/oauth/access_token',
            clientId: '2166c135eda5e417e5ee',
            clientSecret: '73b3322d4e0ed51ddff48f4211e4490d1d9c466d',
            scope: 'user repo'
        },
        {
            name: 'Discord',
            description: 'Free Voice and Text Chat for G@mers',
            image: '../../assets/discord.svg',
            isGenericReaction: true,

            areas: [
                [
                    'If you are add to a channel',
                    'a random message is send into it.'
                ]
            ],

            authenticateAction: getAccessTokenFromDiscord,

            authorizeUrl: 'https://discordapp.com/api/oauth2/authorize',
            redirectUrl: environment.redirectUrl,
            accessUrl: 'https://discordapp.com/api/oauth2/token',
            clientId: '666941488562831380',
            clientSecret: 'xrVr4YymEMjDN-IPTuq-aME7KIOPFoLQ',
            scope: 'identify email connections',
            responseType: 'token'
        },
        {
            name: 'Facebook',
            description:
                'Facebook is a social utility that connects you with the people around you.',
            image: '../../assets/facebook.svg',
            isGenericReaction: true,

            areas: [['TODO', 'TODO']],

            authenticateAction: getAccessTokenFromFacebook,

            authorizeUrl: 'https://m.facebook.com/dialog/oauth/',
            redirectUrl: environment.redirectUrl,
            accessUrl: '',
            clientId: '179479413282728',
            clientSecret: '',
            scope: '',
            responseType: 'token'
        },
        {
            name: 'Imgur',
            description: 'The magic of the Internet',
            image: '../../assets/imgur.svg',
            isGenericReaction: false,

            areas: [['TODO', 'TODO']],

            authenticateAction: getAccessTokenFromImgur,

            authorizeUrl: 'https://api.imgur.com/oauth2/authorize',
            redirectUrl: environment.redirectUrl,
            accessUrl: '',
            clientId: '6b5472c176e8f40',
            clientSecret: '',
            scope: '',
            responseType: 'token'
        },
        {
            name: 'Office365',
            description:
                'Empower every person and organisation on the planet to achieve more',
            image: '../../assets/microsoft.svg',
            isGenericReaction: true,

            areas: [['TODO', 'TODO']],

            authenticateAction: getAccessTokenFromOffice365,

            authorizeUrl:
                'https://login.microsoftonline.com/901cb4ca-b862-4029-9306-e5cd0f6d9f86/oauth2/v2.0/authorize',
            redirectUrl: environment.redirectUrl,
            accessUrl:
                'https://login.microsoftonline.com/901cb4ca-b862-4029-9306-e5cd0f6d9f86/oauth2/v2.0/token',
            clientId: '16d5ca0a-267b-43c2-ab71-fe0418a8ad2f',
            clientSecret: '',
            scope: 'User.Read profile openid email',
            responseType: 'token'
        },
        {
            name: 'Youtube',
            description: 'Broadcast Yourself',
            image: '../../assets/youtube.svg',
            isGenericReaction: false,

            areas: [['TODO', 'TODO']],

            authenticateAction: getAccessTokenFromYoutube,

            authorizeUrl: 'https://accounts.google.com/o/oauth2/auth',
            redirectUrl: environment.redirectUrl,
            accessUrl: 'https://accounts.google.com/o/oauth2/auth/token',
            clientId:
                '613211284635-db38gk0du0cllj0gfpqonm008fe2t29p.apps.googleusercontent.com',
            clientSecret: '',
            scope: 'email profile openid',
            responseType: 'token'
        },
        {
            name: 'LinkedIn',
            description: 'Le réseau social de Curtis',
            image: '../../assets/linkedin.svg',
            isGenericReaction: true,

            areas: [['TODO', 'TODO']],

            authenticateAction: getAccessTokenFromLinkedIn,

            authorizeUrl: 'https://www.linkedin.com/oauth/v2/authorization',
            redirectUrl: environment.redirectUrl,
            accessUrl: 'https://www.linkedin.com/oauth/v2/accessToken',
            clientId: '86v21lx86n52vp',
            clientSecret: 'Sz6abc1pM5gq65x0',
            scope: 'r_emailaddress r_liteprofile w_member_social',
            responseType: 'code'
        }
    ];

    firstName: string;
    lastName: string;

    constructor(
        private snackBar: MatSnackBar,
        private appAuthService: AppAuthService,
        private router: Router
    ) {}

    logOut() {
        this.appAuthService.removeCredentials();
        this.router.navigateByUrl('/signin');
    }

    ngOnInit() {
        const credentials = this.appAuthService.getCredentials();

        if (!credentials) {
            this.snackBar.open(`Please signin to use AREA`, 'Signup', {
                duration: 2000
            });
            this.router.navigateByUrl('signin');
            return;
        }
        const config = {
            auth: {
                username: credentials.username,
                password: credentials.password
            }
        };

        axios
            .get(`${environment.serverUrl}/user/me`, config)
            .then(res => {
                this.firstName = res.data.firstName;
                this.lastName = res.data.lastName;
            })
            .catch(() => {
                this.snackBar.open(`Please signin to use AREA`, 'Signup', {
                    duration: 2000
                });
                this.router.navigateByUrl('signin');
            });
    }
}
