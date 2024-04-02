import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { RegisterRequest } from '../../models/register-request';
import { AuthenticationResponse } from '../../models/authentication-response';
import { VerificationRequest } from '../../models/verification-request';
import { AuthService } from '../../service/auth.service';
import { ToastrService } from 'ngx-toastr';
// import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-register',

  standalone: true,
  imports: [RouterLink, FormsModule, NgIf],

  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerRequest: RegisterRequest = {};
  authResponse: AuthenticationResponse = {};
 
  // message = '';
  
  // otpCode = '';
  otpCode: string[] = ['', '', '', '', '', ''];

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  @ViewChild('input1') input1!: ElementRef;
  @ViewChild('input2') input2!: ElementRef;
  @ViewChild('input3') input3!: ElementRef;
  @ViewChild('input4') input4!: ElementRef;
  @ViewChild('input5') input5!: ElementRef;

  isPasswordStrong(password: string): boolean {
    const strongPasswordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    return strongPasswordRegex.test(password);
  }
  isGmailFormat(email: string): boolean {
    const gmailRegEx = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return gmailRegEx.test(email);
  }
  registerUser() {
    const password = this.registerRequest.password;
    const email = this.registerRequest.email;

    if (!password || !this.isPasswordStrong(password)) {
      console.log(
        'Password is not strong. It should be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one special character.'
      );
      // this.message = 'Password is not strong. It should be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one special character.';
      this.toastr.warning(
        'Password is not strong. It should be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one special character'
      );
      return;
    }
    if (!email || !this.isGmailFormat(email)) {
      console.log('Email is not in Gmail format.');
      // this.message = 'Email is not in Gmail format.';
      this.toastr.warning('Email is not in Gmail format');
      return;
    }
    // this.message = '';
    this.authService.register(this.registerRequest).subscribe({
      next: (response) => {
        if (response) {
          this.authResponse = response;
        } else {
          // this.message = 'Account created successfully\nYou will be redirected to the Welcome page in 3 seconds';
          this.toastr.success('Account created successfully\n Please Login');
          setTimeout(() => {
            this.router.navigate(['login']);
          }, 3000);
        }
      }
    });
  }

  verifyTfa() {
    // this.message = '';
    const verifyRequest: VerificationRequest = {
      email: this.registerRequest.email,
      // code:this.otpCode
      code: this.otpCode.join(''), // Convert otpCode array to string
    };
    this.authService.verifyCode(verifyRequest).subscribe({
      next: (response) => {
        // this.message = 'Account created successfully\nYou will be redirected to the Login page in 3 seconds';
        this.toastr.success('Account created successfully\n Please Login');
        setTimeout(() => {
          localStorage.setItem('token', response.accessToken as string);
          this.router.navigate(['login']);
        }, 2000);
      },
    });
  }
  focusNext(nextInput: HTMLInputElement): void {
    nextInput.focus();
  }
}
