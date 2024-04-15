import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { PasswordRequestUtilnewpassword } from '../../models/PasswordRequestUtilnewpassword';
import { Router } from '@angular/router';
import { ForgetPasswordService } from '../../service/forget-password.service';

@Component({
  selector: 'app-password-reset-confirm',
  templateUrl: './password-reset-confirm.component.html',
  styleUrl: './password-reset-confirm.component.css',
})
export class PasswordResetConfirmComponent {
  newPassword!: string;
  confirmPassword!: string;
  email!: string;
  otp!: number;
  constructor(
    private forgetPasswordService: ForgetPasswordService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  verifyOtp() {
    this.forgetPasswordService.verifyOtp(this.otp, this.email).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.error(error);
      }
    );
  }
  // changePassword() {
  //   const changePasswordRequest: ChangePasswordResetRequest = {
  //     newPassword: this.newPassword,
  //     confirmationPassword: this.confirmPassword
  //   };
  //   this.forgetPasswordService.changePassword(changePasswordRequest, this.email).subscribe({
  //     next: (response) => {
  //       console.log('response ', response);
       
  //     },
  //   });
  //   this.router.navigate(['login']);
  // }
}
