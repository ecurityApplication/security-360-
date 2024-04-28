import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterRequest } from '../../models/register-request';
import { UserService } from '../../service/user.service';
import { StorageService } from '../../service/storage.service';
import { User } from '../../models/user';
import { ChangePasswordResetService } from '../../service/change-password-reset.service';
import { ChangePasswordReset } from '../../models/ChangePasswordReset';
import { IncidentService } from '../../service/incident.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  user: User = new  User();
  id!:number;
  resetRequest: ChangePasswordReset = {
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmationPassword: ''
  };
 
  constructor(
   private passwordService: ChangePasswordResetService,
    private userService :UserService,
    private route: ActivatedRoute,
    private router:Router) {}
  

changePassword() {
  console.log(this.resetRequest,"resetRequest");
  
  this.passwordService.changePassword(this.resetRequest).subscribe(
     (response:any) => {
      console.log("response",response);
      
     // this.resetRequest=response;
      console.log('Password changed successfully');
      // Handle success - redirect, show success message, etc.
    },error => {
      console.error('Error changing password:',error);
      // Handle error - display error message, etc.
    }
  );
}
}
