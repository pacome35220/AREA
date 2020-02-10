import { Component } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import axios from 'axios';

import { environment } from '../../../environments/environment';

interface UserProfile {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

@Component({
    selector: 'snack-bar-user-already-exists',
    template: `
        <span style="color: red">
            This user already exists : email address conflict
        </span>
    `
})
export class SnackBarUserAlreadyExistsComponent {}

@Component({
    selector: 'app-signup-form',
    templateUrl: './signup-form.component.html',
    styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent {
    hide: boolean;
    signUpForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        firstName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
        password: new FormControl('', [
            Validators.required,
            Validators.minLength(6)
        ])
    });

    constructor(private _snackBar: MatSnackBar, private _router: Router) {}

    getMailErrorMessage() {
        if (this.signUpForm.controls.email.hasError('required')) {
            return 'You must enter a value';
        } else if (this.signUpForm.controls.email.hasError('email')) {
            return 'Not a valid email';
        } else {
            return '';
        }
    }

    getPasswordErrorMessage() {
        if (
            this.signUpForm.controls.password.hasError('required') ||
            this.signUpForm.controls.password.hasError('password')
        ) {
            return 'Must be at least 6 characters';
        } else {
            return '';
        }
    }

    async onSubmit(googleProfile?: UserProfile) {
        const form: UserProfile = googleProfile
            ? googleProfile
            : this.signUpForm.value;

        // TODO: Use EventEmitter with form value
        console.log(form);

        const data = {
            firstName: form.firstName,
            lastName: form.lastName
        };
        const config = {
            auth: {
                username: form.email,
                password: form.password
            }
        };
        axios
            .post(`${environment.serverUrl}/user/signup`, data, config)
            .then(res => {
                console.log('res', res);
                if (res.status === 201) {
                    this._router.navigateByUrl('/signin');
                }
            })
            .catch(err => {
                console.log('err', err);
                this._snackBar.openFromComponent(
                    SnackBarUserAlreadyExistsComponent,
                    {
                        duration: 2000
                    }
                );
            });
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
                        lastName: profile.getlastName(),
                        email: profile.getEmail(),
                        password: googleUser.getAuthResponse().id_token
                    });
                },
                error => console.error(JSON.stringify(error))
            );
        });
    }
}
