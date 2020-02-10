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
