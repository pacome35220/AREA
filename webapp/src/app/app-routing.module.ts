import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LandingScreenComponent } from './landing-screen/landing-screen/landing-screen.component';
import { SignupFormComponent } from './landing-screen/signup-form/signup-form.component';

const routes: Routes = [
    { path: '', component: LandingScreenComponent },
    { path: 'signup', component: SignupFormComponent },
    // { path: 'signin', component: SigninFormComponent },

    { path: '**', redirectTo: '/' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
