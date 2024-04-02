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
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PasswordResetConfirmComponent } from './pages/password-reset-confirm/password-reset-confirm.component';
import { NgModule } from '@angular/core';
import { EscalationComponent } from './pages/escalation/escalation.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RouterOutlet,RouterModule, Routes  } from "@angular/router";
import {MatDividerModule} from '@angular/material/divider';
import { UpdateIncidentComponent } from "./pages/update-incident/update-incident.component";
import { IncidentDetailsComponent } from "./pages/incident-details/incident-details.component";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { TokeninterceptorService } from "./service/tokeninterceptor.service";
import { CreateIncidentComponent } from "./pages/create-incident/create-incident.component";
import { CalendarComponent } from './pages/calendar/calendar.component';
import { UpdateEscalationComponent } from './pages/update-escalation/update-escalation.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDrawerContainer} from "@angular/material/sidenav";
import { MatSidenavModule } from '@angular/material/sidenav';
import { CreateAnalysteComponent } from './create-analyste/create-analyste.component';
import { AnalysteListeComponent } from './analyste-liste/analyste-liste.component';
// import { CreateanalysteComponent } from './createanalyste/createanalyste.component';


// import { NgToastModule } from 'ng-angular-popup';

@NgModule({
  declarations: [AppComponent, PasswordResetConfirmComponent, PasswordResetInitiateComponent, SidebarComponent, IncidentLoggingComponent, EscalationComponent, ProfileComponent, ProfileComponent,UpdateIncidentComponent,CreateIncidentComponent,IncidentDetailsComponent, CalendarComponent, UpdateEscalationComponent, CreateAnalysteComponent, AnalysteListeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginComponent,
    RouterOutlet,
    HttpClientModule,
    FormsModule,
    RegisterComponent,
    MatDividerModule,
    MatGridListModule,
    MatDrawerContainer,
    MatSidenavModule,

   
   
    // MatToolbarModule,
    CommonModule,
    // BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      timeOut: 2000,
      progressBar: true,
    }),
    // NgToastModule
  ],
  providers: [
    HttpClient,
     provideAnimationsAsync(),
     {provide:HTTP_INTERCEPTORS, useClass:TokeninterceptorService,multi:true}
    ],
  bootstrap: [AppComponent],
})
export class AppModule { }

