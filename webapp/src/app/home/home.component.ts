import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Service } from '../services/auth-service.service';
import { AppAuthService } from '../services/app-auth.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent {
    services: Service[] = [
        {
            name: 'Github',
            authorizeUrl: 'https://github.com/login/oauth/authorize',
            redirectUrl: 'http://localhost:4200/home',
            accessUrl: 'https://github.com/login/oauth/access_token',
            clientId: '2166c135eda5e417e5ee',
            clientSecret: '73b3322d4e0ed51ddff48f4211e4490d1d9c466d',
            scope: 'user repo'
        },
        {
            name: 'Discord',
            authorizeUrl: 'https://discordapp.com/api/oauth2/authorize',
            redirectUrl: 'http://localhost:4200/home',
            accessUrl: 'https://discordapp.com/api/oauth2/token',
            clientId: '666941488562831380',
            clientSecret: 'xrVr4YymEMjDN-IPTuq-aME7KIOPFoLQ',
            scope: 'identify email connections',
            responseType: 'token'
        },
        {
            name: 'Facebook',
            authorizeUrl: 'https://m.facebook.com/dialog/oauth/',
            redirectUrl: 'https://www.facebook.com/connect/login_success.html',
            accessUrl: '',
            clientId: '189477332115486',
            clientSecret: '',
            scope: '',
            responseType: 'token'
        },
        {
            name: 'Imgur',
            authorizeUrl: 'https://api.imgur.com/oauth2/authorize',
            redirectUrl: 'http://localhost:4200/home',
            accessUrl: '',
            clientId: '6b5472c176e8f40',
            clientSecret: '',
            scope: '',
            responseType: 'token'
        },
        {
            name: 'Office365',
            authorizeUrl:
                'https://login.microsoftonline.com/901cb4ca-b862-4029-9306-e5cd0f6d9f86/oauth2/v2.0/authorize',
            redirectUrl: 'http://localhost:4200/home',
            accessUrl:
                'https://login.microsoftonline.com/901cb4ca-b862-4029-9306-e5cd0f6d9f86/oauth2/v2.0/token',
            clientId: '16d5ca0a-267b-43c2-ab71-fe0418a8ad2f',
            clientSecret: '',
            scope: 'User.Read profile openid email',
            responseType: 'token'
        }
    ];

    constructor(
        private appAuthService: AppAuthService,
        private router: Router
    ) {}

    logOut() {
        this.appAuthService.removeCredentials();
        this.router.navigateByUrl('/signin');
    }
}
