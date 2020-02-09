import { Component } from '@angular/core';

import { Service } from '../services/auth-service.service';

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
            redirectUrl: 'http://localhost:4200/',
            accessUrl: 'https://github.com/login/oauth/access_token',
            clientId: '2166c135eda5e417e5ee',
            scope: 'user repo'
        }
    ];
}
