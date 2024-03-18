

import {LoginComponent} from "./pages/login/login.component";
// import {RegisterComponent} from "./pages/register/register.component";
import {WelcomeComponent} from "./pages/welcome/welcome.component";
import {authGuard} from "./service/auth/auth.guard";
import { RegisterComponent } from './pages/register/register.component';
import { PasswordResetInitiateComponent } from './pages/password-reset-initiate/password-reset-initiate.component';
import { SidebarComponent } from './pages/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { IncidentLoggingComponent } from './pages/incident-logging/incident-logging.component';
import { BrowserModule , provideClientHydration} from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PasswordResetConfirmComponent } from './pages/password-reset-confirm/password-reset-confirm.component';
import { NgModule } from '@angular/core';
import { EscalationComponent } from './pages/escalation/escalation.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RouterOutlet } from "@angular/router";


// import { NgToastModule } from 'ng-angular-popup';

@NgModule({
  declarations: [AppComponent, PasswordResetConfirmComponent, PasswordResetInitiateComponent, SidebarComponent, IncidentLoggingComponent, EscalationComponent, ProfileComponent, ProfileComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginComponent,
    RouterOutlet,
    HttpClientModule,
    FormsModule,
    RegisterComponent,
   
   
   
    // MatToolbarModule,
    CommonModule,
    // BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      timeOut: 2000,
      progressBar: true,
    }),
    // NgToastModule
  ],
  providers: [HttpClient,
    //  provideAnimationsAsync()
    ],
  bootstrap: [AppComponent],
})
export class AppModule { }
// function provideAnimationsAsync() {
//   throw new Error('Function not implemented.');
// }

