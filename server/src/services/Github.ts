import { Service, Area } from './Service';

const ifYouPushNewBranch = async (
    reactionType: 'generic' | 'specific',
    actionAccessToken: string,
    registerTimestamp: number
) => {
    if (Math.round(Math.random() * 5) === 5) {
        if (reactionType === 'generic') {
            return 'Branch develop was push at 3pm.';
        }
        if (reactionType === 'specific') {
            return {
                username: 'pacome35220',
                repository: '42sh',
                branch: 'develop'
            };
        }
    } else {
        return null;
    }
};

const createPullRequestFromBranch = async (data: any) => {};

class Github extends Service {
    constructor() {
        super([
            {
                areaId: 0,
                action: ifYouPushNewBranch,
                specificReaction: createPullRequestFromBranch
            }
        ]);
    }

    // async genericReaction(reactionAccessToken: string, data: any) {}
}
export default new Github();
