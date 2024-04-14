import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { PasswordRequestUtil } from '../../models/PasswordRequestUtil';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-reset-initiate',
  templateUrl: './password-reset-initiate.component.html',
  styleUrl: './password-reset-initiate.component.css'
})
export class PasswordResetInitiateComponent {
  passwordRequestutil: PasswordRequestUtil = { email: '' };


  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
  ) { }
requestPasswordReset() {
  this.authService.resetPasswordRequest(this.passwordRequestutil).subscribe({
    next: (response)=>{
      console.log(response,'Successful Response');
      this.passwordRequestutil=response;

      this.toastr.success(
        'Check your email'
      );
    },error: (error) => {
      console.error('Error:', error); // Log error if any
      this.toastr.error('Error occurred while processing your request.'); // Show toastr notification for error
    }
  })
  this.router.navigate(['passwprdconfirm']);

} 
}
