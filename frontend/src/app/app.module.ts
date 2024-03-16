
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
// import {RegisterComponent} from "./pages/register/register.component";
import {WelcomeComponent} from "./pages/welcome/welcome.component";
import {authGuard} from "./service/auth/auth.guard";
import { RegisterComponent } from './pages/register/register.component';
import { PasswordResetInitiateComponent } from './pages/password-reset-initiate/password-reset-initiate.component';
import { SidebarComponent } from './pages/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { IncidentLoggingComponent } from './pages/incident-logging/incident-logging.component';


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
    MatIconModule,
    MatDrawerContainer,
    MatSidenavModule,
    MatButtonModule,
    MatListModule,
    MatToolbar,
    MatMenuTrigger,
    MatMenu,
    MatToolbarModule,
    CommonModule,
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
export class AppRoutingModule { }
