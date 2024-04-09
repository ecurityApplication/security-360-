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
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { TokeninterceptorService } from "./service/tokeninterceptor.service";
import { CreateIncidentComponent } from "./pages/create-incident/create-incident.component";
import { CalendarComponent } from './pages/calendar/calendar.component';
import { UpdateEscalationComponent } from './pages/update-escalation/update-escalation.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDrawerContainer} from "@angular/material/sidenav";
import { MatSidenavModule } from '@angular/material/sidenav';
// import { ConfirmBoxConfigModule, NgxAwesomePopupModule } from "@costlydeveloper/ngx-awesome-popup";
import {
  NgxAwesomePopupModule,
  ConfirmBoxConfigModule,
  ToastNotificationConfigModule,
  DialogConfigModule
} from '@costlydeveloper/ngx-awesome-popup';
import { DragDirective } from './drag.directive';
import { ShowDialogComponent } from './show-dialog/show-dialog.component';
import { MatDialogModule } from "@angular/material/dialog";
import { IncidentService } from "./service/incident.service";
import { Incident } from "./models/incident";
import { UsersListComponent } from './pages/users-list/users-list.component';
import { CreateUserComponent } from './pages/create-user/create-user.component';
import { NgToastModule } from "ng-angular-popup";
import { User } from "./models/user";
import { EditUserComponent } from './pages/edit-user/edit-user.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
// import { CreateanalysteComponent } from './createanalyste/createanalyste.component';


@NgModule({
  declarations: [AppComponent, PasswordResetConfirmComponent, PasswordResetInitiateComponent, SidebarComponent, IncidentLoggingComponent, EscalationComponent, ProfileComponent, ProfileComponent,UpdateIncidentComponent,CreateIncidentComponent, CalendarComponent, UpdateEscalationComponent,CreateUserComponent , UsersListComponent, DragDirective, ShowDialogComponent, EditUserComponent, NavbarComponent],
  imports: [
    NgxAwesomePopupModule.forRoot({
      colorList: {
        success: '#3caea3', // optional
        info: '#2f8ee5', // optional
        warning: '#ffc107', // optional
        danger: '#e46464', // optional
        customOne: '#3ebb1a', // optional
        customTwo: '#bd47fa', // optional (up to custom five)
      },
    }),
     DialogConfigModule.forRoot(),
    ToastNotificationConfigModule.forRoot() ,
    NgxAwesomePopupModule.forRoot(), 

    ConfirmBoxConfigModule.forRoot(),
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
    NgToastModule,
    MatDialogModule,
    

   
   
    // MatToolbarModule,
    CommonModule,
    // BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      timeOut: 2000,
      progressBar: true,
    }),
    
  ],
  providers: [
    HttpClient,
     provideAnimationsAsync(),
     {provide:HTTP_INTERCEPTORS, useClass:TokeninterceptorService,multi:true}
    ],
  bootstrap: [AppComponent],
  
})
export class AppModule { }

