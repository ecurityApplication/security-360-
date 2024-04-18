import { Component } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ChangePasswordResetRequest } from '../../models/ChangePasswordResetRequest';
import { PasswordResetTokenServiceService } from '../../service/password-reset-token-service.service';

@Component({
  selector: 'app-password-reset-confirm',
  templateUrl: './password-reset-confirm.component.html',
  styleUrl: './password-reset-confirm.component.css',
})
export class PasswordResetConfirmComponent {
 
 
  confirmationPassword!: string;
   newPassword!: string;
  // confirmPassword!: string;
  email!: string;
  otp!: number;
 

  constructor(
    private passwordResetTokenService: PasswordResetTokenServiceService ,
    private toastr: ToastrService,
    private router: Router
  ) {}

  // verifyOtp() {
  //   this.passwordResetTokenService.verifyOtp(this.otp, this.email).subscribe(
  //     response => {
  //       // Handle successful response
  //       console.log(response);
  //     },
  //     error => {
  //       // Handle error
  //       console.error(error);
  //     }
  //   );
  // }
 
  // onSubmit() {
  //   if (this.newPassword !== this.confirmationPassword) {
  //     // Passwords don't match, handle error
  //     return;
  //   }

  //   const changePasswordRequest: ChangePasswordResetRequest = {
  //     newPassword: this.newPassword,
  //     confirmationPassword: this.confirmationPassword
  //   };

  //   this.passwordResetTokenService.changePasswordHandler(this.email, changePasswordRequest)
  //     .subscribe(
  //       response => {
  //         // Password changed successfully, handle success
  //         console.log('Password changed successfully:', response);
  //       },
  //       error => {
  //         // Error occurred while changing password, handle error
  //         console.error('Error changing password:', error);
  //       }
  //     );
  // }
   

  verifyOtpAndChangePassword() {
    // Call the verifyOtp method
    this.passwordResetTokenService.verifyOtp(this.otp, this.email).subscribe(
      (response) => {
        // Handle successful OTP verification
        if (response === 'OTP verified') {
          // Now change the password
          const changePasswordRequest: ChangePasswordResetRequest = {
            newPassword: this.newPassword,
            confirmationPassword: this.confirmationPassword,
          };

          this.passwordResetTokenService
            .changePasswordHandler(changePasswordRequest, this.email)
            .subscribe(
              (passwordChangeResponse) => {
                // Handle successful password change
                console.log('Password changed successfully:', passwordChangeResponse);
              },
              (error) => {
                // Handle password change error
                console.error('Error changing password:', error);
              }
            );
        } else {
          // Handle OTP verification failure
          console.error('OTP verification failed:', response);
        }
      },
      (error) => {
        // Handle OTP verification error
        console.error('Error verifying OTP:', error);
      }
    );
  }

}

