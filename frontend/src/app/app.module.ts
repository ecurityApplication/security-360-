import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import {FormsModule} from "@angular/forms";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {RouterOutlet} from "@angular/router";
import { IncidentListComponent } from './pages/incident/incident-list/incident-list.component';
import { UpdateIncidentComponent } from './pages/incident/update-incident/update-incident.component';
import { CreateIncidentComponent } from './pages/incident/create-incident/create-incident.component';
import {IncidentService} from "./service/incident.service";

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    IncidentListComponent,
    UpdateIncidentComponent,
    CreateIncidentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterOutlet,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    HttpClient,
    IncidentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
