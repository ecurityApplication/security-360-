import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { PasswordRequestUtil } from '../../models/PasswordRequestUtil';
import { Router } from '@angular/router';
import { PasswordResetTokenServiceService } from '../../service/password-reset-token-service.service';


@Component({
  selector: 'app-password-reset-initiate',
  templateUrl: './password-reset-initiate.component.html',
  styleUrl: './password-reset-initiate.component.css',
})
export class PasswordResetInitiateComponent {

  email!: string;
 
  constructor(
    private passwordResetService : PasswordResetTokenServiceService ,
    private toastr: ToastrService,
    private router: Router
  ) {}
  sendEmailVerification() {
    this.passwordResetService.verifyEmail(this.email).subscribe({
      next: (response) => {
        console.log(response, 'Successful Response');
        
        this.toastr.success('Check your email');
        this.router.navigate(['passwordconfirm']);
      },
      error: (error) => {
        console.error('Error:', error); // Log error if any
        this.toastr.error('Error occurred while processing your request.'); // Show toastr notification for error
      },
    });
    
  }
}
