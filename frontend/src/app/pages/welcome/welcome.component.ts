import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {

  sidebarClosed = false;
  darkMode = false;

  toggleSidebar() {
    this.sidebarClosed = !this.sidebarClosed;
  }

  openSidebar() {
    this.sidebarClosed = false;
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
  }






}
