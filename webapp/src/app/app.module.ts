import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';

import { AppComponent } from './app.component';

import { LandingScreenComponent } from './landing-screen/landing-screen/landing-screen.component';
import { SignupFormComponent } from './landing-screen/signup-form/signup-form.component';
import { SigninFormComponent } from './landing-screen/signin-form/signin-form.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
    declarations: [
        AppComponent,
        LandingScreenComponent,
        SignupFormComponent,
        SigninFormComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatIconModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatSidenavModule,
        MatDividerModule,
        MatListModule,
        MatButtonModule,
        MatToolbarModule,
        MatBadgeModule,
        MatDialogModule,
        MatFormFieldModule,
        MatCardModule,
        AppRoutingModule
    ],
    entryComponents: [],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
