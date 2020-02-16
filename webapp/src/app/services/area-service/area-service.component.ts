import { Component, Input, OnInit } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthServiceService } from '../auth-service.service';
import { Service } from 'src/app/home/home.component';

@Component({
    selector: 'app-area-service',
    templateUrl: './area-service.component.html',
    styleUrls: ['./area-service.component.scss']
})
export class AreaServiceComponent implements OnInit {
    @Input() reactionServices: Service[];
    actionService: Service;

    @Input() name: string;
    @Input() description: string;
    @Input() image: string;

    @Input() actionDescription: string;

    @Input() specificReactionDescription: string;
    @Input() genericReactionDescription: string;

    reactionType: 'generic' | 'specific';

    actionAccessToken: string;
    reactionAccessToken: string | undefined;

    constructor(
        private snackBar: MatSnackBar,
        public authService: AuthServiceService
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

    @Input('authenticateAction') getAccessTokenFromCustomService: (
        instance: AreaServiceComponent
    ) => Promise<string>;

    authenticateAction() {
        this.getAccessTokenFromCustomService(this)
            .then(access_token => {
                this.actionAccessToken = access_token;
                console.log(
                    `${this.name} access_token : ${this.actionAccessToken}`
                );
            })
            .catch(error => {
                this.snackBar.open(`Access denied: ${error}`, 'Retry', {
                    duration: 2000
                });
            });
    }

    async registerAREA() {
        console.log(
            `registerAREA - ${this.name} access_token : ${this.actionAccessToken}`
        );
    }

    ngOnInit() {
        this.actionService = this.reactionServices.find(
            service => service.name === this.name
        );
    }
}
