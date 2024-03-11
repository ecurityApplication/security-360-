import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {RegisterComponent} from "./pages/register/register.component";
import {WelcomeComponent} from "./pages/welcome/welcome.component";
import {authGuard} from "./service/auth/auth.guard";
import { IncidentListComponent } from './pages/incident-list/incident-list.component';
import {ForgotPasswordFormComponent} from "./pages/forgot-password-form/forgot-password-form.component";
import {CreateIncidentComponent} from "./pages/create-incident/create-incident.component";

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
    path: 'incidents',
    component: IncidentListComponent
  },
  {
    path: 'create-incident',
    component: CreateIncidentComponent
  },
  {
    path: 'forgotPassword',
    component: ForgotPasswordFormComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
