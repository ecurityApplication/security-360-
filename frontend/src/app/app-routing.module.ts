import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
// import {RegisterComponent} from "./pages/register/register.component";
import {WelcomeComponent} from "./pages/welcome/welcome.component";
import {authGuard} from "./service/auth/auth.guard";
import { RegisterComponent } from './pages/register/register.component';
import { PasswordResetInitiateComponent } from './pages/password-reset-initiate/password-reset-initiate.component';
import { PasswordResetConfirmComponent } from './pages/password-reset-confirm/password-reset-confirm.component';
import { SidebarComponent } from './pages/sidebar/sidebar.component';
import { IncidentLoggingComponent } from './pages/incident-logging/incident-logging.component';
import { EscalationComponent } from './pages/escalation/escalation.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { CreateIncidentComponent } from './pages/create-incident/create-incident.component';
import { UpdateIncidentComponent } from './pages/update-incident/update-incident.component';
import { IncidentDetailsComponent } from './pages/incident-details/incident-details.component';




const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'welcome',
    component: WelcomeComponent,
    canActivate: [authGuard]
  },
  {
    path:'passwordreset',
    component: PasswordResetInitiateComponent
  },
  {
    path:'passwprdconfirm',
    component: PasswordResetConfirmComponent
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
    path: 'incidentlogging',
    component:IncidentLoggingComponent
  },
  {
    path:'escalation',
    component:EscalationComponent
  },
  {
    path:'profile',
    component:ProfileComponent
  },
  {  path:'createIncidents',
  component: CreateIncidentComponent
},
  {path: 'update-incident/:id', component: UpdateIncidentComponent},
  {path:'incident-details/:id', component: IncidentDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
