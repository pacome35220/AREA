import axios from 'axios';
import * as qs from 'qs';

import { AreaServiceComponent } from '../area-service/area-service.component';

export const getAccessTokenFromGithub = async (
    instance: AreaServiceComponent
): Promise<string> => {
    const authorizeUrl =
        instance.actionService.authorizeUrl +
        '?' +
        qs.stringify({
            client_id: instance.actionService.clientId,
            redirect_uri: instance.actionService.redirectUrl,
            scope: 'user repo',
            state: 'mdr',
            allow_signup: 'true'
        });
    const OAuth2_Response = await instance.authService.auth(
        authorizeUrl,
        /code=(.+)&state=(.+)/
    );
    const [, code, state] = OAuth2_Response;
    const { data } = await axios.post(
        'https://cors-anywhere.herokuapp.com/' +
            instance.actionService.accessUrl +
            '?' +
            qs.stringify({
                client_id: instance.actionService.clientId,
                client_secret: instance.actionService.clientSecret,
                code,
                state,
                redirect_uri: 'http://localhost:4200/signup'
            })
    );
    return qs.parse(data).access_token;
};
