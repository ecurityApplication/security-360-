import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';

import { WelcomeComponent } from './pages/welcome/welcome.component';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';

// @ts-ignore
import { MatIconModule } from '@angular/material/icon';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatDrawerContainer } from '@angular/material/sidenav';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatToolbar } from '@angular/material/toolbar';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RegisterComponent } from './pages/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { PasswordResetConfirmComponent } from './pages/password-reset-confirm/password-reset-confirm.component';
import { PasswordResetInitiateComponent } from './pages/password-reset-initiate/password-reset-initiate.component';
// import { NgToastModule } from 'ng-angular-popup';

@NgModule({
  declarations: [AppComponent, PasswordResetConfirmComponent, PasswordResetInitiateComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginComponent,
    RouterOutlet,
    HttpClientModule,
    FormsModule,
    RegisterComponent,
    MatIconModule,
    MatDrawerContainer,
    MatSidenavModule,
    MatButtonModule,
    MatListModule,
    MatToolbar,
    MatMenuTrigger,
    MatMenu,
    MatToolbarModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      timeOut: 2000,
      progressBar: true,
    }),
    // NgToastModule
  ],
  providers: [HttpClient, provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
