import * as qs from 'qs';

import { Service } from 'src/app/home/home.component';
import { getRegexFromOAuthWindowPopup } from '../getRegexFromOAuthWindowPopup';

export const getAccessTokenFromYoutube = async (
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
        /access_token=([^&]*)/
    );
    return OAuth2_Response[1];
};
