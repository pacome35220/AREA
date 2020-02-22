import Axios from 'axios';
import { AreaService } from './Service';

const ifYouWroteTenComments = async (
    reactionType: 'generic' | 'specific',
    actionAccessToken: string,
    registerTimestamp: number
) => {
    const axios = Axios.create({
        baseURL: 'https://api.imgur.com/3',
        headers: {
            //check client id on header
            Authorization: `Bearer ${actionAccessToken}`
        }
    });
    // const user = await axios.get('/account/me');
    const nbcomments = await axios.get(`/account/me/comments/count`);
    var nbcomment = await nbcomments['data'];

    if (nbcomment % 10 == 0) {
        console.log('ifYouWroteTenComments', 'True');
        return true;
    }
    //delete comment
    console.log('ifYouWroteTenComments', 'False');
    return false;
};

//specific reaction
const pushAnImage = async (actionAccessToken: string, imagePath: string) => {
    const axios = Axios.create({
        baseURL: 'https://api.imgur.com/3',
        headers: {
            //check client id on header
            Authorization: `Bearer ${actionAccessToken}`
        }
    });
    if (!imagePath) {
        return null;
    }
    var Module = require('module');
    var fs = require('fs');
    Module._extensions['.jpg'] = function(module: any, fn: any) {
        var base64 = fs.readFileSync(fn).toString('base64');
        module._compile(
            'module.exports="data:image/jpg;base64,' + base64 + '"',
            fn
        );
    };
    var image = require('./area.jpg'); //imagePath);
    var title = 'I am a Boss';
    var description =
        "wouah... you have wrote 10 comments it's the time to stop !";
    var privacy = 'picture has been pushed thanks to the area';
    var response = await axios.post('/image', {
        title: title,
        description: description,
        image: image,
        privacy: privacy
    });

    return await JSON.parse(response.data);
};

export const Imgur: AreaService = {
    serviceName: 'Imgur',
    areas: [
        {
            areaId: 0,
            action: ifYouWroteTenComments,
            specificReaction: pushAnImage
        }
    ]
};
