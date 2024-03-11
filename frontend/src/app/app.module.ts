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
import {UpdateIncidentComponent} from "./pages/update-incident/update-incident.component";
import {IncidentDetailsComponent} from "./pages/incident-details/incident-details.component";

// @ts-ignore
import {MatIconModule}from "@angular/material/icon";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatDrawerContainer} from "@angular/material/sidenav";
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import {MatToolbar} from "@angular/material/toolbar";
import {MatMenu, MatMenuTrigger} from "@angular/material/menu";
import { MatToolbarModule } from '@angular/material/toolbar';


let IncidentService;

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    IncidentListComponent,
    CreateIncidentComponent,
    UpdateIncidentComponent,
    IncidentDetailsComponent,
    SidebarComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginComponent,
    RegisterComponent,
    RouterOutlet,
    HttpClientModule,
    FormsModule,
    LoginComponent,
    MatIconModule,
    MatDrawerContainer,
    MatSidenavModule,
    MatButtonModule,
    MatListModule,
    MatToolbar,
    MatMenuTrigger,
    MatMenu,
    MatToolbarModule

  ],
  providers: [
    HttpClient,
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
