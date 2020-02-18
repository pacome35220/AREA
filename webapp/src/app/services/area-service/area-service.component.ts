import { Component, Input, OnInit } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';

import { Service } from 'src/app/home/home.component';

@Component({
    selector: 'app-area-service',
    templateUrl: './area-service.component.html',
    styleUrls: ['./area-service.component.scss']
})
export class AreaServiceComponent implements OnInit {
    @Input() reactionServices: Service[];

    actionService: Service;
    reactionServiceName: string;

    @Input() name: string;
    @Input() description: string;
    @Input() image: string;

    @Input() actionDescription: string;

    @Input() specificReactionDescription: string;
    @Input() genericReactionDescription: string;

    reactionType: 'generic' | 'specific';

    actionAccessToken: string;
    reactionAccessToken: string | undefined;

    constructor(private snackBar: MatSnackBar) {}

    isAuthenticate() {
        if (this.actionAccessToken && this.reactionType === 'specific') {
            return true;
        } else if (
            this.actionAccessToken &&
            this.reactionType === 'generic' &&
            this.reactionAccessToken
        ) {
            return true;
        } else {
            return false;
        }
    }

    @Input('authenticateAction') getAccessTokenFromCustomService: (
        service: Service
    ) => Promise<string>;

    authenticateAction() {
        this.getAccessTokenFromCustomService(this.actionService)
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

    authenticateReaction() {
        const selectedReactionService = this.reactionServices.find(
            service => service.name === this.reactionServiceName
        );

        selectedReactionService
            .authenticateAction(selectedReactionService)
            .then(access_token => {
                this.reactionAccessToken = access_token;
                console.log(
                    `${selectedReactionService.name} access_token : ${this.reactionAccessToken}`
                );
            })
            .catch(error => {
                this.snackBar.open(`Access denied: ${error}`, 'Retry', {
                    duration: 2000
                });
            });
    }

    async registerAREA() {
        const specificData = {
            name: this.name,
            reactionType: this.reactionType,
            actionAccessToken: this.actionAccessToken
        };
        const genericData = {
            ...specificData,
            reactionName: this.reactionServiceName,
            reactionAccessToken: this.reactionAccessToken
        };

        if (this.reactionType === 'generic') {
            console.log(genericData);
        }
        if (this.reactionType === 'specific') {
            console.log(specificData);
        }
    }

    ngOnInit() {
        this.actionService = this.reactionServices.find(
            service => service.name === this.name
        );
        this.reactionServices = this.reactionServices.filter(
            service => service.isGenericReaction
        );
    }
}
