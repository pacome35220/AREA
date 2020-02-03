import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthServiceService {
    private oAuthCallbackUrl: string;
    private oAuthTokenUrl: string;
    private authenticated: boolean = false;
    private token: string;
    private expires: any = 0;
    private windowHandle: any = null;
    private intervalId: any = null;
    private expiresTimerId: any = null;
    private intervalLength = 100;

    private locationWatcher = new EventEmitter(); // TODO Switch du RxJS ????

    constructor() {
        this.windowHandle = this.createWindow(
            this.oAuthTokenUrl,
            'OAuth2 Login'
        );
    }

    public login(callbackUrl: string, grantUrl: string, clientId: string) {
        var regex = /access_token(.*)/;

        this.oAuthCallbackUrl = callbackUrl;
        this.oAuthTokenUrl = grantUrl
            .replace('__callbackUrl__', callbackUrl)
            .replace('__grantUrl__', grantUrl)
            .replace('__clientId__', clientId);

        this.intervalId = setInterval(() => {
            var href = this.windowHandle.location.href;

            if (href) {
                if (href.match(regex)) {
                    console.log('Callback URL: ', href);
                    clearInterval(this.intervalId);
                    const parsed: any = this.parse(
                        href.substr(this.oAuthCallbackUrl.length + 1)
                    );
                    const expiresSeconds = Number(parsed.expires_in) || 1800;

                    this.token = parsed.access_token;
                    if (this.token) {
                        this.authenticated = true;
                        this.startExpiresTime(expiresSeconds);
                        this.expires = new Date();
                        this.expires = this.expires.setSeconds(
                            this.expires.getSeconds() + expiresSeconds
                        );
                        this.windowHandle.close();
                        this.emitAuthStatus(true, null);
                    } else {
                        this.authenticated = false;
                        this.emitAuthStatus(false, parsed);
                    }
                }
            } else {
                if (href.indexOf(this.oAuthCallbackUrl) == 0) {
                    clearInterval(this.intervalId);
                    var parsed = this.parse(
                        href.substr(this.oAuthCallbackUrl.length + 1)
                    );
                    this.windowHandle.close();
                    this.emitAuthStatus(false, parsed);
                }
            }
        }, this.intervalLength);
    }

    public doLogout() {
        this.authenticated = false;
        this.expiresTimerId = null;
        this.expires = 0;
        this.token = null;
        this.emitAuthStatus(true, null);
        console.log('Session has been cleared');
    }

    emitAuthStatus(status: boolean, error: any) {
        this.locationWatcher.emit({
            success: status,
            authenticated: this.authenticated,
            token: this.token,
            expires: this.expires,
            error: error
        });
    }

    startExpiresTime(expiresSecond: number) {
        if (this.expiresTimerId) {
            clearTimeout(this.expiresTimerId);
        }
        this.expiresTimerId = setTimeout(() => {
            console.log('Session has expired');
            this.doLogout();
        }, expiresSecond * 1000);
        console.log('Token expiration timer set for', expiresSecond, 'seconds');
    }

    private parse(str: string) {
        throw new Error('Method not implemented.'); // TODO
    }

    private createWindow(
        url: string,
        name: string = 'Window',
        width: number = 500,
        height: number = 600,
        left: number = 0,
        top: number = 0
    ) {
        var options = `width=${width},height=${height},left=${left},top=${top}`;

        return window.open(url, name, options);
    }

    public getSession() {
        return {
            authenticated: this.authenticated,
            token: this.token,
            expires: this.expires
        };
    }

    public isAuthenticated() {
        return this.authenticated;
    }
}
