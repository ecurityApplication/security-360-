
import { RouterModule, RouterOutlet, Routes } from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
// import {RegisterComponent} from "./pages/register/register.component";
import {WelcomeComponent} from "./pages/welcome/welcome.component";
import {authGuard} from "./service/auth/auth.guard";
import { RegisterComponent } from './pages/register/register.component';
import { PasswordResetInitiateComponent } from './pages/password-reset-initiate/password-reset-initiate.component';
import { SidebarComponent } from './pages/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { IncidentLoggingComponent } from './pages/incident-logging/incident-logging.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { PasswordResetConfirmComponent } from './pages/password-reset-confirm/password-reset-confirm.component';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { NgModule } from '@angular/core';


// import { NgToastModule } from 'ng-angular-popup';

@NgModule({
  declarations: [AppComponent, PasswordResetConfirmComponent, PasswordResetInitiateComponent, SidebarComponent, IncidentLoggingComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginComponent,
    RouterOutlet,
    HttpClientModule,
    FormsModule,
    RegisterComponent,
    CommonModule,
    // BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      timeOut: 2000,
      progressBar: true,
    }),
    // NgToastModule
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent],
})
export class AppRoutingModule { }
function provideAnimationsAsync() {
  throw new Error('Function not implemented.');
}

