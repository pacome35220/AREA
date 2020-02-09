import { Component, Input, OnInit } from '@angular/core';
import qs from 'qs';

import { AuthServiceService, Service } from '../auth-service.service';
import axios from 'axios';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-github',
    templateUrl: './github.component.html',
    styleUrls: ['./github.component.scss']
})
export class GithubComponent implements OnInit {
    @Input() reactionServices: Service[];

    actionService: Service;

    image = '../../../assets/github.svg';
    title = 'Github';
    subtitle = 'wow wow wow wow wow wow wow wow';

    actionDescription = 'If you push a new branch, ...';

    specificReactionDescription =
        '... a PR to master is create with this branch';
    genericReactionDescription =
        '... a text representing the action is send to ...';

    reactionType: 'generic' | 'specific';

    actionAccessToken: string;
    reactionAccessToken: string | undefined;

    constructor(
        private authService: AuthServiceService,
        private snackBar: MatSnackBar
    ) {}

    isAuthenticate() {
        if (!this.actionAccessToken) {
            return false;
        }
        if (this.reactionType === 'specific') {
            return true;
        } else if (
            this.reactionType === 'generic' &&
            !this.reactionAccessToken
        ) {
            return false;
        }
        return true;
    }

    callbackUrlParser(url: string) {
        return url.match(/code=(.+)&state=(.+)/);
    }

    async authenticateAction() {
        const authorizeUrl =
            this.actionService.authorizeUrl +
            '?' +
            qs.stringify({
                client_id: this.actionService.clientId,
                redirect_uri: this.actionService.redirectUrl,
                scope: 'user repo',
                state: 'mdr',
                allow_signup: 'true'
            });

        try {
            const OAuth2_Response = await this.authService.auth(
                authorizeUrl,
                this.callbackUrlParser
            );
            const [, code, state] = OAuth2_Response;

            const { data } = await axios.post(
                'https://cors-anywhere.herokuapp.com/' +
                    this.actionService.accessUrl +
                    '?' +
                    qs.stringify({
                        client_id: this.actionService.clientId,
                        client_secret: this.actionService.clientSecret,
                        code,
                        state,
                        redirect_uri: 'http://localhost:4200/signup'
                    })
            );

            this.actionAccessToken = qs.parse(data).access_token;
            console.log(`github access_token : ${this.actionAccessToken}`);
        } catch (error) {
            this.snackBar.open("bah alors on refuse l'accès mdr ?", 'FDP', {
                duration: 2000
            });
        }
    }

    async registerAREA() {
        console.log(
            `registerAREA github access_token : ${this.actionAccessToken}`
        );

        const res = await axios.get('https://api.github.com/user', {
            headers: {
                Authorization: `Bearer ${this.actionAccessToken}`
            }
        });

        console.log(res);
    }

    ngOnInit() {
        this.actionService = this.reactionServices.find(
            service => service.name === 'Github'
        );
    }
}
