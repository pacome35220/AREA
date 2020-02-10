import { Injectable } from '@angular/core';

export interface Service {
    name: string;
    authorizeUrl: string;
    redirectUrl: string;
    accessUrl: string;
    clientId: string;
    clientSecret: string;
    scope?: string;
    responseType?: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthServiceService {
    public auth(
        authorizeUrl: string,
        urlParser: (url: string) => RegExpMatchArray
    ): Promise<RegExpMatchArray> {
        return new Promise((resolve, reject) => {
            const popupWindow = this.createWindow(authorizeUrl, 'OAuth2 Login');

            const intervalId = setInterval(() => {
                if (popupWindow.closed) {
                    clearInterval(intervalId);
                    reject('popup close by user');
                }

                if (popupWindow.location.href) {
                    const params = urlParser(popupWindow.location.href);

                    if (params) {
                        clearInterval(intervalId);
                        popupWindow.close();
                        resolve(params);
                    }
                }
            }, 500);
        });
    }

    private createWindow(
        url: string,
        name: string,
        width = 500,
        height = 600,
        left = 0,
        top = 0
    ) {
        const options = `width=${width},height=${height},left=${left},top=${top}`;

        return window.open(url, name, options);
    }
}
