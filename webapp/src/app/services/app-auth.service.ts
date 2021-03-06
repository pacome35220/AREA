import { Injectable } from '@angular/core';

import { AxiosBasicCredentials } from 'axios';

@Injectable({
    providedIn: 'root'
})
export class AppAuthService {
    constructor() {}

    saveCredentials(username: string, password: string) {
        localStorage.setItem('userBasicAuth', btoa(`${username}:${password}`));
    }

    removeCredentials() {
        localStorage.removeItem('userBasicAuth');
    }

    getCredentials(): AxiosBasicCredentials {
        const userBasicAuth = localStorage.getItem('userBasicAuth');

        if (!userBasicAuth) {
            return null;
        }

        const user = atob(userBasicAuth).split(':');

        if (user.length !== 2) {
            return null;
        }
        return {
            username: user[0],
            password: user[1]
        };
    }
}
