import { Component, Input } from '@angular/core';
import { PasswordResetTokenServiceService } from '../../service/password-reset-token-service.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-reset-verify-code',
  templateUrl: './password-reset-verify-code.component.html',
  styleUrl: './password-reset-verify-code.component.css'
})
export class PasswordResetVerifyCodeComponent {
  otpcode!: number;
  @Input() email !:string ;
  constructor(
    private passwordResetService : PasswordResetTokenServiceService ,
    private toastr: ToastrService,
    private router: Router
  ) {}
  sendVerificationCode() {
    console.log("otpcode");
  
    this.passwordResetService.verifyOtp(this.otpcode,this.email).subscribe({
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
    this.router.navigate(['passwordconfirm']);
  }
}
