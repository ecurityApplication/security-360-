import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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
  // sendEmailVerification() {
  //   this.passwordResetService.verifyEmail(this.email).subscribe({
      
  //     next: (response) => {
  //       console.log(this.email);
  //       console.log(response, 'Successful Response');
        
  //       this.toastr.success('Check your email');
  //       this.router.navigate(['passwordconfirm']);
  //     },
  //     error: (error) => {
  //       console.error('Error:', error); // Log error if any
  //       this.toastr.error('Error occurred while processing your request.'); // Show toastr notification for error
  //     },
  //   });
    
  // }
  sendEmailVerification() {
    console.log("email");
  
    this.passwordResetService.verifyEmail(this.email).subscribe({
      next: (response: any) => {
        console.log(response, 'Successful Response');
        if (response && response.message === 'success') {
          // Assuming your backend returns a success message in a JSON format
          this.toastr.success('Check your email');
          this.router.navigate(['passwordverifycode']);
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
    this.router.navigate(['passwordverifycode']);
  }
}
