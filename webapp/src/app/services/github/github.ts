import axios from 'axios';
import * as qs from 'qs';

import { Service } from 'src/app/home/home.component';
import { getRegexFromOAuthWindowPopup } from '../getRegexFromOAuthWindowPopup';

export const getAccessTokenFromGithub = async (
    service: Service
): Promise<string> => {
    console.log(service);
    const authorizeUrl =
        service.authorizeUrl +
        '?' +
        qs.stringify({
            client_id: service.clientId,
            redirect_uri: service.redirectUrl,
            scope: 'user repo',
            state: 'mdr',
            allow_signup: 'true'
        });
    const OAuth2_Response = await getRegexFromOAuthWindowPopup(
        authorizeUrl,
        /code=(.+)&state=(.+)/
    );
    const [, code, state] = OAuth2_Response;
    const { data } = await axios.post(
        'https://cors-anywhere.herokuapp.com/' +
            service.accessUrl +
            '?' +
            qs.stringify({
                client_id: service.clientId,
                client_secret: service.clientSecret,
                code,
                state,
                redirect_uri: 'http://localhost:4200/signup'
            })
    );
    return qs.parse(data).access_token;
};
