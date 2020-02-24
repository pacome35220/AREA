import * as qs from 'qs';
import axios from 'axios';

import { Service } from 'src/app/home/home.component';
import { getRegexFromOAuthWindowPopup } from '../getRegexFromOAuthWindowPopup';

export const getAccessTokenFromLinkedIn = async (
    service: Service
): Promise<string> => {
    const autorizeUrl =
        service.authorizeUrl +
        '?' +
        qs.stringify({
            client_id: service.clientId,
            response_type: service.responseType,
            scope: service.scope,
            redirect_uri: service.redirectUrl
        });
    const OAuth2_Response = await getRegexFromOAuthWindowPopup(
        autorizeUrl,
        /code=([^&]*)/
    );
    const code = OAuth2_Response[1];

    const { data } = await axios.post(
        'https://cors-anywhere.herokuapp.com/' +
            service.accessUrl +
            '?' +
            qs.stringify({
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: service.redirectUrl,
                client_id: service.clientId,
                client_secret: service.clientSecret
            })
    );
    return qs.parse(data).access_token;
};
