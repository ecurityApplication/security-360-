import { Component, Input } from '@angular/core';
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
  changePasswordResetRequest: ChangePasswordResetRequest = {
    newPassword: '',
    confirmationPassword:''
  };
  
  newPassword!: string;
  confirmationPassword!: string;
  @Input() email!: string;

  //passwordResetForm: FormGroup;
  constructor(
    private passwordResetService : PasswordResetTokenServiceService ,
    private toastr: ToastrService,
    private router: Router,
    //private formBuilder: FormBuilder
  ) {
    // this.passwordResetForm = this.formBuilder.group({
    //   // otp: ['', Validators.required],
    //   newPassword: ['', Validators.required],
    //   confirmPassword: ['', Validators.required]
    // });
  }

  // onSubmit() {
  //   if (this.passwordResetForm.valid) {
  //     // const otp = this.passwordResetForm.value.otp;
  //     const newPassword = this.passwordResetForm.value.newPassword;
  //     const confirmationPassword = this.passwordResetForm.value.confirmPassword;

  //     if (newPassword === confirmationPassword) {
  //       const changePasswordRequest: ChangePasswordResetRequest = {
  //         newPassword: newPassword,
  //         confirmationPassword: confirmationPassword
  //       };

  //        this.passwordResetTokenService.verifyOtp(otp, this.email).subscribe(() => {
  //         this.passwordResetTokenService.changePasswordHandler(changePasswordRequest, this.email).subscribe(() => {
  //           // Password updated successfully
  //           this.toastr.success('Password updated successfully');
  //           this.router.navigate(['/login']); // Assuming redirection after password change
  //         }, (error) => {
  //           // Handle password change error
  //           console.error('Error changing password:', error);
  //           this.toastr.error('Error changing password');
  //         });
  //        }
  //        , (error) => {
  //       //   // Handle OTP verification error
  //          console.error('Error verifying OTP:', error);
  //          this.toastr.error('Error verifying OTP');
  //        });
  //     } else {
  //       // Passwords do not match
  //       this.toastr.error('Passwords do not match');
  //     }
  //   }
  // }
  sendVerificationCode() {
    console.log("otpcode");
  
    this.passwordResetService.changePasswordHandler(this.changePasswordResetRequest,this.email).subscribe({
      next: (response: any) => {
        console.log(response, 'otp Response');
        if (response && response.message === 'success') {
          // Assuming your backend returns a success message in a JSON format
          this.toastr.success('It was a Valid email');
          this.router.navigate(['passwordconfirm']);
        } else {
          // Handle other success responses or unexpected data
          console.error('Unexpected response from server:', response);
          this.toastr.error('Unexpected response from server.');
        }
      },
      error: (error) => {
        console.error('Error:', error);
        this.toastr.error('Error occurred while processing your request.');
      }
    });
    this.router.navigate(['login']);
  }
}
