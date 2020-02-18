import * as qs from 'qs';

import { Service } from 'src/app/home/home.component';
import { getRegexFromOAuthWindowPopup } from '../getRegexFromOAuthWindowPopup';

export const getAccessTokenFromFacebook = async (
    service: Service
): Promise<string> => {
    const authorizeUrl =
        service.authorizeUrl +
        '?' +
        qs.stringify({
            client_id: service.clientId,
            response_type: service.responseType,
            redirect_uri: service.redirectUrl,
            state: 'abcd'
        });

    const OAuth2_Response = await getRegexFromOAuthWindowPopup(
        authorizeUrl,
        /access_token=((.+)&.+)&/
    );
    return OAuth2_Response[2];
};
