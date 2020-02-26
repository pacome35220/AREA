import * as qs from 'qs';
import axios from 'axios';

import { Service } from 'src/app/home/home.component';
import { getRegexFromOAuthWindowPopup } from '../getRegexFromOAuthWindowPopup';

export const getAccessTokenFromReddit = async (
    service: Service
): Promise<string> => {
    const authorizeUrl =
        service.authorizeUrl +
        '?' +
        qs.stringify({
            client_id: service.clientId,
            response_type: service.responseType,
            redirect_uri: service.redirectUrl,
            scope: service.scope,
            state: 'area'
        });

    const OAuth2_Response = await getRegexFromOAuthWindowPopup(
        authorizeUrl,
        /code=([^&]*)/
    );
    const code = OAuth2_Response[1];
    console.log('Code => ', code);

    const bodyData = {
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: service.redirectUrl
    };
    const config = {
        auth: {
            username: service.clientId,
            password: service.clientSecret
        },
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        }
    };
    const { data } = await axios.post(
        'https://cors-anywhere.herokuapp.com/' + service.accessUrl,
        bodyData,
        config
    );

    console.log('Data => ', data);
    return qs.parse(data).access_token;
};
