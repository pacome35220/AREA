import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthServiceService {
    public auth(
        authorizeUrl: string,
        urlRegexParser: RegExp
    ): Promise<RegExpMatchArray> {
        return new Promise((resolve, reject) => {
            const popupWindow = this.createWindow(authorizeUrl, 'OAuth2 Login');

            const intervalId = setInterval(() => {
                if (popupWindow.closed) {
                    clearInterval(intervalId);
                    reject('popup close by user');
                }

                if (popupWindow.location.href) {
                    const params = popupWindow.location.href.match(
                        urlRegexParser
                    );

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
