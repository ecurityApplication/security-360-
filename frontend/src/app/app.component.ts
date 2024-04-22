import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from './service/auth.service';
import { NgToastService } from 'ng-angular-popup';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Use styleUrls instead of styleUrl
})
export class AppComponent {

//  title = 'sidenav';

//   isSideNavCollapsed = false;
//   screenWidth = 0;

//   onToggleSideNav(data: SideNavToggle): void {
//     this.screenWidth = data.screenWidth;
//     this.isSideNavCollapsed = data.collapsed;
//   }
  
}
