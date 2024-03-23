import { Component, ElementRef, ViewChild } from '@angular/core';
import { AuthenticationRequest } from '../../models/authentication-request';
import { AuthenticationResponse } from '../../models/authentication-response';
import { AuthService } from '../../service/auth.service';
import { Router, RouterLink } from '@angular/router';
import { VerificationRequest } from '../../models/verification-request';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [FormsModule, NgIf, RouterLink],
  styleUrl: './login.component.css',
})
export class LoginComponent {
  authRequest: AuthenticationRequest = {};
  // otpCode: any;
  otpCode: string[] = ['', '', '', '', '', '']; // Array to store individual digits
  authResponse: AuthenticationResponse = {};
  // message = '';
  @ViewChild('input1') input1!: ElementRef;
  @ViewChild('input2') input2!: ElementRef;
  @ViewChild('input3') input3!: ElementRef;
  @ViewChild('input4') input4!: ElementRef;
  @ViewChild('input5') input5!: ElementRef;
  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  authenticate() {
    this.authService.login(this.authRequest).subscribe({
      next: (response) => {
        console.log('response ', response);
        this.authResponse = response;
        if (this.authResponse.mfaEnabled) {
          localStorage.setItem('token', response.accessToken as string);
          //this.router.navigate(['welcome']);
        } else {
          // If login fails, show toaster message
          this.toastr.info('Login Failed. Try again later!', 'Login Status');
        }
      }
      // },
      // error: (error) => {
      //   // Handle error
      //   console.error('Error occurred during login:', error);
      //   this.toastr.error('An error occurred during login. Please try again later.', 'Error');
      // }
    });
  }

  verifyCode() {
    // this.message = '';
    const verifyRequest: VerificationRequest = {
      email: this.authRequest.email,
      code: this.otpCode.join(''), // Combine OTP digits into a single string
      // code:this.otpCode
    };
    this.authService.verifyCode(verifyRequest).subscribe( res => {
 
        // this.message = 'You will be redirected to the Dashboard page ';
        console.log('token');
        localStorage.setItem('token', res.accessToken as string);
        this.router.navigate(['incidentlogging']);
      
    } , error => {
      console.error(error)
    });
  }

  focusNext(nextInput: HTMLInputElement): void {
    nextInput.focus();
  }
}
