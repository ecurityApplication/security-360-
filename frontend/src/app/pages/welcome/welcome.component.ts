import { Component, EventEmitter, HostListener, OnInit, Output } from "@angular/core";
import { UserService } from "../../service/user.service";
import { NgToastService } from "ng-angular-popup";
import { animate, keyframes, style, transition, trigger } from "@angular/animations";
import { navbarData } from "../../models/navbarData";

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css',
  
})
export class WelcomeComponent {

  

 }
 

 

 
