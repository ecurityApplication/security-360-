import {LoginComponent} from "./pages/login/login.component";
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import {WelcomeComponent} from "./pages/welcome/welcome.component";
import { PasswordResetInitiateComponent } from './pages/password-reset-initiate/password-reset-initiate.component';
import { SidebarComponent } from './pages/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { IncidentLoggingComponent } from './pages/incident-logging/incident-logging.component';
// import { BrowserModule , provideClientHydration} from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PasswordResetConfirmComponent } from './pages/password-reset-confirm/password-reset-confirm.component';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { EscalationComponent } from './pages/escalation/escalation.component';
import { ProfileComponent } from './pages/profile/profile.component';
// import { RouterOutlet,RouterModule, Routes ,RouterLinkActive } from "@angular/router";
import {MatDividerModule} from '@angular/material/divider';
import { UpdateIncidentComponent } from "./pages/update-incident/update-incident.component";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { TokeninterceptorService } from "./service/tokeninterceptor.service";
import { CreateIncidentComponent } from "./pages/create-incident/create-incident.component";
import { UpdateEscalationComponent } from './pages/update-escalation/update-escalation.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDrawerContainer} from "@angular/material/sidenav";
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
// import { ConfirmBoxConfigModule, NgxAwesomePopupModule } from "@costlydeveloper/ngx-awesome-popup";
import {
  NgxAwesomePopupModule,
  ConfirmBoxConfigModule,
  ToastNotificationConfigModule,
  DialogConfigModule
} from '@costlydeveloper/ngx-awesome-popup';
import { DragDirective } from './drag.directive';
import { ShowDialogComponent } from './pages/show-dialog/show-dialog.component';
import { MatDialogModule } from "@angular/material/dialog";
import { IncidentService } from "./service/incident.service";
import { Incident } from "./models/incident";
import { UsersListComponent } from './pages/users-list/users-list.component';
import { CreateUserComponent } from './pages/create-user/create-user.component';
import { NgToastModule } from "ng-angular-popup";
import { User } from "./models/user";
import { EditUserComponent } from './pages/edit-user/edit-user.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { CreateRoleComponent } from './pages/create-role/create-role.component';
import { EditRoleComponent } from './pages/edit-role/edit-role.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BodyComponent } from './pages/body/body.component';
import { PasswordResetVerifyCodeComponent } from './pages/password-reset-verify-code/password-reset-verify-code.component';
import { OverlayModule } from "@angular/cdk/overlay";
import { CdkMenuModule } from "@angular/cdk/menu";
import { LoggedInLayoutComponent } from './pages/logged-in-layout/logged-in-layout.component';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterLinkActive, RouterModule, RouterOutlet } from "@angular/router";
import { MonthlyKPIsComponent } from './pages/monthly-kpis/monthly-kpis.component';
import { NgApexchartsModule } from "ng-apexcharts";
import { HighchartsChartModule } from 'highcharts-angular';
import { YearlyKpisComponent } from './pages/yearly-kpis/yearly-kpis.component';
import { NgChartjsModule } from 'ng-chartjs';
import { StatisticsComponent } from "./pages/statistics/statistics.component";
@NgModule({
  declarations: [ AppComponent, PasswordResetConfirmComponent, PasswordResetInitiateComponent, SidebarComponent, IncidentLoggingComponent, EscalationComponent, ProfileComponent, ProfileComponent,UpdateIncidentComponent,CreateIncidentComponent,UpdateEscalationComponent,CreateUserComponent , UsersListComponent, DragDirective, ShowDialogComponent, EditUserComponent, NavbarComponent,CreateRoleComponent, EditRoleComponent, SignUpComponent, BodyComponent, PasswordResetVerifyCodeComponent, LoggedInLayoutComponent,StatisticsComponent,MonthlyKPIsComponent, YearlyKpisComponent  ],
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
    MatToolbarModule,
    MatDividerModule,
    MatGridListModule,
    MatDrawerContainer,
    MatSidenavModule,
    NgToastModule,
    MatDialogModule,
    MatIconModule,
    BrowserModule,
    MatListModule,
    MatSidenavModule,
    ReactiveFormsModule,
    RouterModule,
    RouterLinkActive,
    NgChartjsModule,
    HighchartsChartModule,
    OverlayModule,
  CdkMenuModule,
  MatFormFieldModule,
   MatSelectModule,
   HighchartsChartModule,
   NgChartjsModule,
    // Add this line
    // MatToolbarModule,
    CommonModule,
     BrowserAnimationsModule, 
    ToastrModule.forRoot({
      timeOut: 2000,
      progressBar: true,
    }),
   
    
    
    // MatToolbarModule,
   
    // MatButtonModule,
    // MatIconModule,
  
  ],
  
  providers: [
    // PasswordchangeService,
    HttpClient,
     provideAnimationsAsync(),
     {provide:HTTP_INTERCEPTORS, useClass:TokeninterceptorService,multi:true}
    ],
  bootstrap: [AppComponent],
  
schemas: [CUSTOM_ELEMENTS_SCHEMA], // Add CUSTOM_ELEMENTS_SCHEMA here
// Other configurations...
})
export class AppModule { }

