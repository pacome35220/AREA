import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'Area';
    isLogin = false;

    opened: boolean;
    status: boolean;

    constructor() {}

    ngOnInit() {}
}
