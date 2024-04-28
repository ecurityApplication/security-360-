import { NgModule } from '@angular/core';

import {LoginComponent} from "./pages/login/login.component";
// import {RegisterComponent} from "./pages/register/register.component";
import {WelcomeComponent} from "./pages/welcome/welcome.component";
import {AuthGuard} from "./service/auth/auth.guard";

import { PasswordResetInitiateComponent } from './pages/password-reset-initiate/password-reset-initiate.component';
import { PasswordResetConfirmComponent } from './pages/password-reset-confirm/password-reset-confirm.component';
import { SidebarComponent } from './pages/sidebar/sidebar.component';
import { IncidentLoggingComponent } from './pages/incident-logging/incident-logging.component';
import { EscalationComponent } from './pages/escalation/escalation.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { UpdateIncidentComponent } from './pages/update-incident/update-incident.component';
import { CreateIncidentComponent } from './pages/create-incident/create-incident.component';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { UpdateEscalationComponent } from './pages/update-escalation/update-escalation.component';
import { UsersListComponent } from './pages/users-list/users-list.component';
import { CreateUserComponent } from './pages/create-user/create-user.component';
import { EditUserComponent } from './pages/edit-user/edit-user.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { PasswordResetVerifyCodeComponent } from './pages/password-reset-verify-code/password-reset-verify-code.component';
import { LoggedInLayoutComponent } from './pages/logged-in-layout/logged-in-layout.component';
import { RouterModule, Routes } from '@angular/router';
import { MonthlyKPIsComponent } from './pages/monthly-kpis/monthly-kpis.component';
import { YearlyKpisComponent } from './pages/yearly-kpis/yearly-kpis.component';


const routes: Routes = [
  {
    path: 'layout',
    component: LoggedInLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'incidentlogging',
        component:IncidentLoggingComponent
      },{
        path: 'welcome',
        component: WelcomeComponent, 
      },
      {
        path:'update-user/:id',
        component: EditUserComponent
      },
      {
        path:'profile',
        component:ProfileComponent
      },
      {
        path:'sidebar',
        component:SidebarComponent
      },
      {
        path:'escalation',
        component:EscalationComponent
      },
      {
        path:'profile',
        component:ProfileComponent
      },
      {
        path:'createIncident',
        component:CreateIncidentComponent
      },
      {
        path:'calendar',
        component:CalendarComponent
      },
      {
        path:'userList',
        component:  UsersListComponent,
      },
      {
        path:'monthlyKPIs',
        component:  MonthlyKPIsComponent,
      },
      {
        path:'yearlyKPIs',
        component:  YearlyKpisComponent,
      },
      {
        path:'navbar',
        component: NavbarComponent
      },
      {path: 'update-escalation/:id',
       component: UpdateEscalationComponent
      },
      {path: 'update-incident/:id',
       component: UpdateIncidentComponent
      },
    ]
  },
      {
        path:'passwordreset',
        component: PasswordResetInitiateComponent
      },
      {
        path:'passwordconfirm',
        component: PasswordResetConfirmComponent
      },
      {
        path:'passwordverifycode',
        component: PasswordResetVerifyCodeComponent
      },
      {
        path:'signup',
        component:SignUpComponent
      },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
