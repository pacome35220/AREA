import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
interface Categories {
    label: string;
    href: string;
}

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    categories: Array<Categories> = [
        { label: 'Discord', href: '/services/discord' },
        { label: 'Epitech', href: '/services/epitech-intranet' },
        { label: 'Imgur', href: '/services/imgur' },
        { label: 'YouTube', href: '/services/youtube' },
        { label: 'Google Drive', href: '/services/google' },
        { label: 'Google Calendar', href: '/services/google' },
        { label: 'Trello', href: '/services/trello' }
    ];

    opened: boolean;
    status: boolean;
    authService: AuthServiceService;

    constructor() {}

    ngOnInit() {}

    toggleStatus() {
        this.status = !this.status;
    }

    logOut() {
        this.authService.doLogout;
    }
}
