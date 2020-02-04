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
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AppComponent } from './app.component';

import {
    SignupFormComponent,
    SnackBarUserAlreadyExistsComponent
} from './landing-screen/signup-form/signup-form.component';
import { SigninFormComponent } from './landing-screen/signin-form/signin-form.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';

@NgModule({
    declarations: [
        AppComponent,
        SignupFormComponent,
        SnackBarUserAlreadyExistsComponent,
        SigninFormComponent,
        HomeComponent
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
        MatSnackBarModule,
        AppRoutingModule
    ],
    entryComponents: [SnackBarUserAlreadyExistsComponent],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
