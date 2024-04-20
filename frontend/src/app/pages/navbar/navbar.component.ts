import { Component, Input, OnInit } from '@angular/core';
//import { Dropdown, Collapse, initMDB } from "mdb-ui-kit";
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  // constructor() { }

  // ngOnInit(): void {
  //   initMDB({ Dropdown, Collapse });
  // }
  sidebarOpen = false;
  miniSidebar = false;
  
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
}
