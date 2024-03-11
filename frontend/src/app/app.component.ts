import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
  sideBarOpen: boolean | undefined;

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;


  }
}
