import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { RegisterRequest } from '../../models/register-request';
import { UserService } from '../../service/user.service';
import { StorageService } from '../../service/storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  currentUser: any;
registerRequest : RegisterRequest = {}
  constructor(private authService :AuthService ,private router :Router , private userService :UserService,private storageService: StorageService){ }
  
  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
  //  this.getUser();
    // this.AuthService.g
  }
  // getUser(){
  //   this.userService.getUser(this.registerRequest).subscribe(data=>{
  //     console.log("user data",data)
  //     this.registerRequest = data;
  //   }, error => {
  //     console.error("Error fetching user data:", error);
  //     // Handle error appropriately, such as displaying an error message to the user
  //   })
  // }
}
