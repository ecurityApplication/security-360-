import { Component } from '@angular/core';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-logged-in-layout',
  templateUrl: './logged-in-layout.component.html',
  styleUrl: './logged-in-layout.component.css'
})
export class LoggedInLayoutComponent {
  
    isSideNavCollapsed = false;
    screenWidth = 0;
  
    onToggleSideNav(data: SideNavToggle): void {
      this.screenWidth = data.screenWidth;
      this.isSideNavCollapsed = data.collapsed;
    }
}
