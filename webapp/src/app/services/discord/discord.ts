import * as qs from 'qs';

import { AreaServiceComponent } from '../area-service/area-service.component';

export const getAccessTokenFromDiscord = async (
    instance: AreaServiceComponent
): Promise<string> => {
    const authorizeUrl =
        instance.actionService.authorizeUrl +
        '?' +
        qs.stringify({
            response_type: instance.actionService.responseType,
            client_id: instance.actionService.clientId,
            scope: instance.actionService.scope
        });

    const OAuth2_Response = await instance.authService.auth(
        authorizeUrl,
        /access_token=((.+)&.+)&/
    );
    return OAuth2_Response[2];
};
