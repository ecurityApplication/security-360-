import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {
incidents: any;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
// Method to navigate to the Incidents List page
  navigateToIncidentsList() {
    this.router.navigate(['/incidents']);
  }
  navigateToAddList() {
    this.router.navigate(['/createIncidents']);
  }

}
