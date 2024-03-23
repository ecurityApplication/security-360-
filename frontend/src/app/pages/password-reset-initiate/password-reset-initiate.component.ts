import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { PasswordRequestUtil } from '../../models/PasswordRequestUtil';

@Component({
  selector: 'app-password-reset-initiate',
  templateUrl: './password-reset-initiate.component.html',
  styleUrl: './password-reset-initiate.component.css'
})
export class PasswordResetInitiateComponent {
  passwrdRequest: PasswordRequestUtil = { email: '' }; // Corrected variable name
  email: string = '';

  constructor(
    private authService: AuthService,
    private toastr: ToastrService
  ) { }

  requestPasswordReset() { 
    this.authService.resetPasswordRequest(this.passwrdRequest.email).subscribe({
      next: (response) => {
        console.log('response ', response);
      },
      error: (error) => { // Handle error if needed
        console.error('Error occurred:', error);
      }
    });
  }
}
