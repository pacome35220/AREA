import { Injectable } from '@angular/core';
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router
} from '@angular/router';
import { AppAuthService } from './app-auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private appAuthService: AppAuthService
    ) {}

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user = this.appAuthService.getCredentials();

        if (!user) {
            this.router.navigateByUrl('/signin');
            return false;
        } else {
            return true;
        }
    }
}
