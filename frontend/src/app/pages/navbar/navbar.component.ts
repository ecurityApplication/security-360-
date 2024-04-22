import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '../../service/storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
 @Input() collapsed = false;
 @Input() screenWidth = 0;

 canShowSearchAsOverlay = false;
  constructor(private router: Router,private storageService: StorageService) {}

 getHeadClass() : string{
  let styleClass = '';
  if(this.collapsed && this.screenWidth > 768) {
    styleClass = 'head-trimmed';
  } else {
    styleClass = 'head-md-screen'
  }
  return styleClass;
 }
checkCanShowSearchAsOverlay(innerWidth: number) : void{
  if(innerWidth < 845){
    this.canShowSearchAsOverlay=true;
  }else{
    this.canShowSearchAsOverlay=false;
  }
}

  isLoggedIn$!: Observable<boolean>;


ngOnInit() {
  this.isLoggedIn$ = this.storageService.isLoggedIn;
}

onLogout() {
  this.storageService.logout();
}
selected = 'option2';
}
