  import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
 
  import { AuthService } from '../../service/auth.service';
  import { IncidentService } from '../../service/incident.service';
  import { Incident } from '../../models/incident';
import { StorageService } from '../../service/storage.service';
import { navbarData } from '../../models/navbarData';
import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { Router } from '@angular/router';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

  @Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.css',
    // animations: [
    //   trigger('fadeInOut', [
    //     transition(':enter', [
    //       style({opacity: 0}),
    //       animate('350ms',
    //         style({opacity: 1})
    //       )
    //     ]),
    //     transition(':leave', [
    //       style({opacity: 1}),
    //       animate('350ms',
    //         style({opacity: 0})
    //       )
    //     ])
    //   ]),
    //   trigger('rotate', [
    //     transition(':enter', [
    //       animate('1000ms', 
    //         keyframes([
    //           style({transform: 'rotate(0deg)', offset: '0'}),
    //           style({transform: 'rotate(2turn)', offset: '1'})
    //         ])
    //       )
    //     ])
    //   ])
    // ]
  })
  export class SidebarComponent  {

    constructor(private router: Router,
      private authService: AuthService,
      private incidentService : IncidentService,
      private storageService : StorageService) { }

      @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
      @Input() isOpen: boolean = false; 
      collapsed=false;
      screenWidth = 0;
      navData =navbarData;
      selectedItem: number | null = null;

      selectItem(index: number) {
        this.selectedItem = index;
      }

      @HostListener('window:resize',['$event'])
      onResize(event:any) {
        this.screenWidth = window.innerWidth;
        if(this.screenWidth <= 768){
          this.collapsed = false;
        }
      }

      ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
      }

      toggleCollapse(): void {
        this.collapsed = !this.collapsed;
        this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
      }
      closeSidenav(): void {
        this.collapsed = false;
        this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
      }
    
    
    
    logout(): void {
      this.authService.logout().subscribe({
        next: (res: any) => {
          console.log(res,'Logout successful');
          this.storageService.logout();
          this.router.navigate(['login']);
        },
        error: (err: any) => {
          console.error('Logout failed:', err);
        }
      });
    }
  }
