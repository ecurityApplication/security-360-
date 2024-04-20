  import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
  import { Router } from '@angular/router';
  import { AuthService } from '../../service/auth.service';
  import { IncidentService } from '../../service/incident.service';
  import { Incident } from '../../models/incident';
import { StorageService } from '../../service/storage.service';

  @Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.css'
  })
  export class SidebarComponent  {

    constructor(private router: Router,
      private authService: AuthService,
      private incidentService : IncidentService,
      private storageService : StorageService) { }

      sidebarOpen = false;
      miniSidebar = false;
      incidents: Incident[] = [];
      @Input() isOpen: boolean = false;

      // darkMode = false;
      // sidebarClosed = false;
     
    
  //  ngOnInit(): void {
  //   this.getIncidentByCategory('yourCategory'); // Specify your category here
  // }

  // getIncidentByCategory(category: string): void {
  //   this.incidentService.getIncidentByCategory(category)
  //     .subscribe(
  //       (data: any) => {
  //         console.log(data);
  //         this.incidents = data;
  //       },
  //       error => {
  //         console.error(error);
  //       }
  //     );
  // }
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen;
      if (window.innerWidth <= 320) {
        this.miniSidebar = !this.miniSidebar;
      }
    }

    // toggleDarkMode() {
    //   this.darkMode = !this.darkMode;
    // }
    
    logout(): void {
      this.authService.logout().subscribe({
        next: res => {
          console.log(res,'Logout successful');
          this.storageService.signOut();
          this.router.navigate(['login']);
        },
        error: err => {
          console.error('Logout failed:', err);
        }
      });
    }
  }
