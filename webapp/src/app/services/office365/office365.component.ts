import { Component, Input, OnInit } from '@angular/core';
import qs from 'qs';

import { AuthServiceService, Service } from '../auth-service.service';
import axios from 'axios';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-office365',
    templateUrl: './office365.component.html',
    styleUrls: ['./office365.component.scss']
})
export class Office365Component implements OnInit {
    @Input() reactionServices: Service[];
    actionService: Service;

    image = '../../../assets/microsoft.svg';
    title = 'Office365';
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
        return url.match(/access_token=([^&]*)/);
    }

    async authenticateAction() {
        const authorizeUrl =
            this.actionService.authorizeUrl +
            '?' +
            qs.stringify({
                response_type: this.actionService.responseType,
                client_id: this.actionService.clientId,
                scope: this.actionService.scope
            });

        try {
            const OAuth2_Response = await this.authService.auth(
                authorizeUrl,
                this.callbackUrlParser
            );
            this.actionAccessToken = qs.parse(OAuth2_Response)[1];
            console.log(`Office365 access_token : ${this.actionAccessToken}`);
        } catch (error) {
            this.snackBar.open('Access denied', 'Retry', {
                duration: 2000
            });
        }
    }

    async registerAREA() {
        console.log(
            `registerAREA office365 access_token : ${this.actionAccessToken}`
        );
    }

    ngOnInit() {
        this.actionService = this.reactionServices.find(
            service => service.name === 'Office365'
        );
    }
}
