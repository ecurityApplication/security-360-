import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ChangePasswordResetRequest } from '../../models/ChangePasswordResetRequest';
import { PasswordResetTokenServiceService } from '../../service/password-reset-token-service.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-password-reset-confirm',
  templateUrl: './password-reset-confirm.component.html',
  styleUrl: './password-reset-confirm.component.css',
})
export class PasswordResetConfirmComponent {
  otp!: number;
  newPassword!: string;
  confirmationPassword!: string;
  email!: string;

  passwordResetForm: FormGroup;
  constructor(
    private passwordResetTokenService: PasswordResetTokenServiceService,
    private toastr: ToastrService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.passwordResetForm = this.formBuilder.group({
      otp: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.passwordResetForm.valid) {
      const otp = this.passwordResetForm.value.otp;
      const newPassword = this.passwordResetForm.value.newPassword;
      const confirmationPassword = this.passwordResetForm.value.confirmPassword;

      if (newPassword === confirmationPassword) {
        const changePasswordRequest: ChangePasswordResetRequest = {
          newPassword: newPassword,
          confirmationPassword: confirmationPassword
        };

        this.passwordResetTokenService.verifyOtp(otp, this.email).subscribe(() => {
          this.passwordResetTokenService.changePasswordHandler(changePasswordRequest, this.email).subscribe(() => {
            // Password updated successfully
            this.toastr.success('Password updated successfully');
            this.router.navigate(['/login']); // Assuming redirection after password change
          }, (error) => {
            // Handle password change error
            console.error('Error changing password:', error);
            this.toastr.error('Error changing password');
          });
        }, (error) => {
          // Handle OTP verification error
          console.error('Error verifying OTP:', error);
          this.toastr.error('Error verifying OTP');
        });
      } else {
        // Passwords do not match
        this.toastr.error('Passwords do not match');
      }
    }
  }
  // verifyOtpAndChangePassword() {
  //   // Call the verifyOtp method
  //   this.passwordResetTokenService.verifyOtp(this.otp, this.email).subscribe(
  //     (response) => {
  //       // Handle successful OTP verification
  //       if (response === 'OTP verified') {
  //         // Now change the password
  //         const changePasswordRequest: ChangePasswordResetRequest = {
  //           newPassword: this.newPassword,
  //           confirmationPassword: this.confirmationPassword,
  //         };

  //         this.passwordResetTokenService
  //           .changePasswordHandler(changePasswordRequest, this.email)
  //           .subscribe(
  //             (passwordChangeResponse) => {
  //               // Handle successful password change
  //               console.log('Password changed successfully:', passwordChangeResponse);
  //             },
  //             (error) => {
  //               // Handle password change error
  //               console.error('Error changing password:', error);
  //             }
  //           );
  //       } else {
  //         // Handle OTP verification failure
  //         console.error('OTP verification failed:', response);
  //       }
  //     },
  //     (error) => {
  //       // Handle OTP verification error
  //       console.error('Error verifying OTP:', error);
  //     }
  //   );
  // }
  
}

