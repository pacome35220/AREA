import { Component, Input, OnInit } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';

import { Service } from 'src/app/home/home.component';
import { MatRadioChange, MatRadioButton } from '@angular/material/radio';
import { MatCheckboxChange } from '@angular/material/checkbox';

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

    @Input() areas: [string, string][];

    @Input() genericReactionDescription: string;

    reactionType: 'generic' | 'specific' = 'specific';

    areaId: number = -1;

    actionAccessToken: string;
    reactionAccessToken: string | undefined;

    constructor(private snackBar: MatSnackBar) {}

    onChangeAREA(event: MatRadioChange) {
        const value: [string, string] = event.value;

        this.areas.forEach((area, index) => {
            if (value[0] === area[0] && value[1] === area[1]) {
                this.areaId = index;
            }
        });
    }

    onChangeReactionType(event: MatCheckboxChange) {
        this.reactionType = event.checked ? 'generic' : 'specific';
    }

    isAuthenticate() {
        if (
            this.actionAccessToken &&
            this.reactionType === 'specific' &&
            this.areaId !== -1
        ) {
            return true;
        } else if (
            this.actionAccessToken &&
            this.reactionType === 'generic' &&
            this.areaId !== -1 &&
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
            serviceName: this.name,
            areaId: this.areaId,
            actionAccessToken: this.actionAccessToken
        };
        const genericData = {
            actionServiceName: this.name,
            actionId: this.areaId,
            actionAccessToken: this.actionAccessToken,
            reactionServiceName: this.reactionServiceName,
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
