import * as qs from 'qs';

import { AreaServiceComponent } from '../area-service/area-service.component';

export const getAccessTokenFromFacebook = async (
    instance: AreaServiceComponent
): Promise<string> => {
    const authorizeUrl =
        instance.actionService.authorizeUrl +
        '?' +
        qs.stringify({
            client_id: instance.actionService.clientId,
            response_type: instance.actionService.responseType,
            redirect_uri: instance.actionService.redirectUrl,
            state: 'abcd'
        });

    const OAuth2_Response = await instance.authService.auth(
        authorizeUrl,
        /access_token=((.+)&.+)&/
    );
    return OAuth2_Response[2];
};
