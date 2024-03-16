import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  sidebarOpen = false;
  miniSidebar = false;
  darkMode = false;

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
    if (window.innerWidth <= 320) {
      this.miniSidebar = !this.miniSidebar;
    }
  }
  toggleDarkMode() {
    this.darkMode = !this.darkMode;
  }
}
