import { Component, Input, OnInit } from '@angular/core';
import * as qs from 'qs';
import { AuthServiceService, Service } from '../auth-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-facebook',
    templateUrl: './facebook.component.html',
    styleUrls: ['./facebook.component.scss']
})
export class FacebookComponent implements OnInit {
    @Input() reactionServices: Service[];

    actionService: Service;

    image = '../../../assets/facebook.svg';
    title = 'Facebook';
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

    ngOnInit() {
        this.actionService = this.reactionServices.find(
            service => service.name === 'Facebook'
        );
    }

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
        return url.match(/access_token=([^&]*)/);
    }

    async authenticateAction() {
        const authorizeUrl =
            this.actionService.authorizeUrl +
            '?' +
            qs.stringify({
                client_id: this.actionService.clientId,
                response_type: this.actionService.responseType,
                redirect_uri: this.actionService.redirectUrl,
                state: 'abcd'
            });

        try {
            const OAuth2_Response = await this.authService.auth(
                authorizeUrl,
                this.callbackUrlParser
            );

            console.log('Regex => ' + qs.parse(OAuth2_Response)[2]);
            this.actionAccessToken = qs.parse(OAuth2_Response)[2];
            console.log(`Facebook access_token : ${this.actionAccessToken}`);
        } catch (error) {
            this.snackBar.open('Access denied: ' + error, 'Retry', {
                duration: 2000
            });
        }
    }

    async registerAREA() {
        console.log(
            `registerAREA facebook access_token : ${this.actionAccessToken}`
        );
    }
}
