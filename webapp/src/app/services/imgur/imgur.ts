import * as qs from 'qs';

import { Service } from 'src/app/home/home.component';
import { getRegexFromOAuthWindowPopup } from '../getRegexFromOAuthWindowPopup';

export const getAccessTokenFromImgur = async (
    service: Service
): Promise<string> => {
    const authorizeUrl =
        service.authorizeUrl +
        '?' +
        qs.stringify({
            client_id: service.clientId,
            response_type: service.responseType,
            scope: service.scope
        });

    const OAuth2_Response = await getRegexFromOAuthWindowPopup(
        authorizeUrl,
        /access_token=([^&]*)/
    );
    return OAuth2_Response[1];
};
