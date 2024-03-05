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
import { IncidentListComponent } from './pages/incident-list/incident-list.component';
import { CreateIncidentComponent } from './pages/create-incident/create-incident.component';

let IncidentService;

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    IncidentListComponent,
    CreateIncidentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginComponent,
    RegisterComponent,
    RouterOutlet,
    HttpClientModule,
    FormsModule,
    LoginComponent
  ],
  providers: [
    HttpClient,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
