import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {RegisterComponent} from "./pages/register/register.component";
import {WelcomeComponent} from "./pages/welcome/welcome.component";
import {authGuard} from "./service/auth/auth.guard";
import { CreateIncidentComponent } from './pages/create-incident/create-incident.component';
import {UpdateIncidentComponent} from "./pages/update-incident/update-incident.component";
import {IncidentDetailsComponent} from "./pages/incident-details/incident-details.component";
import {IncidentListComponent} from "./pages/incident-list/incident-list.component";

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
  {  path:'createIncidents',
     component: CreateIncidentComponent
},
  {path: '', redirectTo: 'welcome', pathMatch: 'full'},
  {path: 'update-incident/:id', component: UpdateIncidentComponent},
  {path:'incident-details/:id', component: IncidentDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
