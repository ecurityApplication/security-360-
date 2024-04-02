import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Use styleUrls instead of styleUrl
})
export class AppComponent {
  showSidebar: boolean = true;
  constructor(private router: Router,private authService: AuthService) { 
    this.router.events.subscribe((event) => {
           if (event instanceof NavigationEnd) {
            this.showSidebar = !['/login', '/register','/CreateAnalyste','/incident-details/:id','/update-incident/:id','/createIncident'].includes(event.url);
          }
         });
  }
  sidebarOpen = false;
  miniSidebar = false;
  darkMode = false;
  sidebarClosed = false;

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
        localStorage.clear()
        this.router.navigate(['/login']);
      }
    );
  }
  // showSidebar: boolean = true;

  // constructor(private router: Router) {
  //   this.router.events.subscribe((event) => {
  //     if (event instanceof NavigationEnd) {
  //       this.showSidebar = !['/login', '/register'].includes(event.url);
  //     }
  //   });
  // }
  title = 'frontend';

}
