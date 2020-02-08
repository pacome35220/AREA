import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';

interface Categorie {
    label: string;
    href: string;
    quote: string;
    image: string;
    isGeneric: boolean;
    isSpecific: boolean;
}

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    categories: Categorie[] = [
        // {
        //     label: 'Discord',
        //     href: 'discord',
        //     quote: 'Bring back the old Skype',
        //     image: '../../assets/discord.svg',
        //     isGeneric: false,
        //     isSpecific: false
        // },
        // {
        //     label: 'Epitech',
        //     href: 'epitech',
        //     quote: 'Shit here we go again',
        //     image: '../../assets/epitech.svg',
        //     isGeneric: false,
        //     isSpecific: false
        // },
        // {
        //     label: 'Imgur',
        //     href: 'imgur',
        //     quote: 'Your photo manager',
        //     image: '../../assets/drive.svg', // TODO Switch image
        //     isGeneric: false,
        //     isSpecific: false
        // },
        // {
        //     label: 'YouTube',
        //     href: 'youtube',
        //     quote: 'Your video player',
        //     image: '../../assets/youtube.svg',
        //     isGeneric: false,
        //     isSpecific: false
        // },
        // {
        //     label: 'Google Drive',
        //     href: 'googe-drive',
        //     quote: 'Your drive',
        //     image: '../../assets/drive.svg',
        //     isGeneric: false,
        //     isSpecific: false
        // },
        // {
        //     label: 'Google Calendar',
        //     href: 'googe-calendar',
        //     quote: 'Your calendar',
        //     image: '../../assets/drive.svg', // TODO Switch image
        //     isGeneric: false,
        //     isSpecific: false
        // },
        // {
        //     label: 'Trello',
        //     href: 'trello',
        //     quote: 'Your lovely tool project management',
        //     image: '../../assets/trello.svg',
        //     isGeneric: false,
        //     isSpecific: false
        // },
        // {
        //     label: 'Facebook',
        //     href: 'facebook',
        //     quote: 'Your wonderful social network',
        //     image: '../../assets/trello.svg', // TODO Switch image
        //     isGeneric: false,
        //     isSpecific: false
        // },
        {
            label: 'Github',
            href: 'github',
            quote: 'wow',
            image: '../../assets/trello.svg', // TODO Switch image
            isGeneric: false,
            isSpecific: false
        }
    ];

    status: boolean;
    authService: AuthServiceService;

    constructor() {}

    ngOnInit() {}

    toggleStatus() {
        this.status = !this.status;
    }

    isLogged() {
        return this.authService.isAuthenticated();
    }

    logOut() {
        this.authService.doLogout;
    }

    logIn() {
        this.authService.login('', '', ''); // TODO parameters
    }
}
