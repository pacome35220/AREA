import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-github',
    templateUrl: './github.component.html',
    styleUrls: ['./github.component.scss']
})
export class GithubComponent implements OnInit {
    image = '../../../assets/github.svg';
    title = 'Github';
    subtitle = 'wow wow wow wow wow wow wow wow';

    actionDescription = 'If you push a new branch, ...';

    specificReactionDescription =
        '... a PR to master is create with this branch';
    genericReactionDescription =
        '... a text representing the action is send to ...';

    reactionType: 'generic' | 'specific';

    constructor() {}

    ngOnInit() {}
}
