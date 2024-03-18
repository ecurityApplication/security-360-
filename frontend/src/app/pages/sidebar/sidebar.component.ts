import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  constructor(private router: Router,private authService: AuthService) { }
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
  // navigateTo() {
  //   this.router.navigate(['/register']);
  // }
  // logout(){
  //   this.authService.logout();
  // }
  logout() {
    this.authService.logout().subscribe(
      () => {
        this.router.navigate(['/login']);
      }
    );
  }
}
