import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatRadioChange } from '@angular/material/radio';
import { MatCheckboxChange } from '@angular/material/checkbox';

import axios, { AxiosRequestConfig } from 'axios';

import { environment } from 'src/environments/environment';
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

    @Input() areas: [string, string][];

    reactionType: 'generic' | 'specific' = 'specific';

    areaId: number = -1;

    actionAccessToken: string;
    reactionAccessToken: string | undefined;

    @Input() axiosRequestConfig: AxiosRequestConfig;

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
        let data = {};

        if (this.reactionType === 'generic') {
            data = {
                actionServiceName: this.name,
                actionId: this.areaId,
                actionAccessToken: this.actionAccessToken,
                reactionServiceName: this.reactionServiceName,
                reactionAccessToken: this.reactionAccessToken
            };
        } else {
            data = {
                serviceName: this.name,
                areaId: this.areaId,
                actionAccessToken: this.actionAccessToken
            };
        }
        axios
            .post(
                `${environment.serverUrl}/${this.reactionType}-area`,
                data,
                this.axiosRequestConfig
            )
            .then(response => console.log("C'est bon: , ", response))
            .catch(err => {
                this.snackBar.open(`An error occured : ${err}`, 'Retry', {
                    duration: 2000
                });
            });
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
