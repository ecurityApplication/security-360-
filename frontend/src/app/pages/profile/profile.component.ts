import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterRequest } from '../../models/register-request';
import { UserService } from '../../service/user.service';
import { StorageService } from '../../service/storage.service';
import { User } from '../../models/user';
import { PasswordchangeService } from '../../service/passwordchange.service';
import { ChangePasswordRequest } from '../../models/ChangePasswordRequest';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Incident } from '../../models/incident';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  id!: number;
  // user: User = new  User();
  user: User[] = [];

  currentPassword: string ='';
  newPassword: string ='';
  confirmationPassword: string='';
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.userService.getUser().subscribe(data => {
      console.log(data)
      this.user = data;
    }, error => console.log(error));
   

  }
  // ngOnInit(): void {
  //   // Call the method to fetch users on component initialization
  //   this.getUser();

  // }

  // getUser() {
  //   this.userService.getUser().subscribe(
  //     (user) => {
       
  //       this.user = user;

  //       console.log(this.user);
        
  //     },
  //     (error) => {
  //       console.error(error);
  //     }
  //   );
  // }
  constructor(private passwordService: PasswordchangeService,private userService:UserService,  private route: ActivatedRoute,) {}
// changePassword() {
//   const request: ChangePasswordRequest = {
//     currentPassword: this.currentPassword,
//       newPassword: this.newPassword,
//       confirmationPassword: this.confirmationPassword
//   };

//   this.passwordService.changePassword(request).subscribe({
//     next: () => {
//     },
//     error: (error) => {
//       console.error('Error:', error);
//     },
//   });
// }

Onsumbit() {
  const request = {
    currentPassword: this.currentPassword,
    newPassword: this.newPassword,
    confirmationPassword: this.confirmationPassword
  };

  this.passwordService.changePassword(request).subscribe({
    next: (response) => {
      console.log('Password change successful:', response);
      // Reset the form or perform any other actions after successful password change
    },
    error: (error) => {
      console.error('Error changing password:', error);
      // Handle error, show error message, etc.
    }
  });
}


}
