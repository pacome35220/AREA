// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    googleSignIn: {
        client_id:
            '17187330540-0deh8na7a9rsimnqt27t3pjauhb6cbk4.apps.googleusercontent.com',
        project_id: 'area-264408',
        auth_uri: 'https://accounts.google.com/o/oauth2/auth',
        token_uri: 'https://oauth2.googleapis.com/token',
        auth_provider_x509_cert_url:
            'https://www.googleapis.com/oauth2/v1/certs',
        client_secret: 'FSGcVDISL9X9k4EIzjpXYRqj',
        javascript_origins: ['http://localhost:4200']
    },
    serverUrl: 'http://localhost:8080',
    redirectUrl: 'http://localhost:4200/home'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
