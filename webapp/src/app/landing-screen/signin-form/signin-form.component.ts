import { Component } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { environment } from '../../../environments/environment';

interface UserProfile {
    firstName: string;
    familyName: string;
    email: string;
    password?: string;
    googleToken?: string;
}

@Component({
    selector: 'app-signin-form',
    templateUrl: './signin-form.component.html',
    styleUrls: ['./signin-form.component.scss']
})
export class SigninFormComponent {
    hide: boolean;
    signInForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
            Validators.required,
            Validators.minLength(6)
        ])
    });

    getMailErrorMessage() {
        if (this.signInForm.controls.email.hasError('required')) {
            return 'You must enter a value';
        } else if (this.signInForm.controls.email.hasError('email')) {
            return 'Not a valid email';
        } else {
            return '';
        }
    }

    getPasswordErrorMessage() {
        if (
            this.signInForm.controls.password.hasError('required') ||
            this.signInForm.controls.password.hasError('password')
        ) {
            return 'Must be at least 6 characters';
        } else {
            return '';
        }
    }

    onSubmit(googleProfile?: UserProfile) {
        // TODO: Use EventEmitter with form value
        if (googleProfile) {
            console.log(googleProfile);
        } else {
            console.log(this.signInForm.value);
        }
    }

    ngAfterViewInit() {
        const gapi = window['gapi'];
        const client_id = environment.web.client_id;

        gapi.load('auth2', () => {
            const auth2 = gapi.auth2.init({ client_id });

            auth2.attachClickHandler(
                'googleBtn',
                {},
                googleUser => {
                    const profile = googleUser.getBasicProfile();

                    this.onSubmit({
                        firstName: profile.getGivenName(),
                        familyName: profile.getFamilyName(),
                        email: profile.getEmail(),
                        googleToken: googleUser.getAuthResponse().id_token
                    });
                },
                error => console.error(JSON.stringify(error))
            );
        });
    }
}
