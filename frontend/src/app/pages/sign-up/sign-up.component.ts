import { Component, ElementRef, ViewChild } from '@angular/core';
import { RegisterRequest } from '../../models/register-request';
import { AuthenticationResponse } from '../../models/authentication-response';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { VerificationRequest } from '../../models/verification-request';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  registerRequest: RegisterRequest = {};
  authResponse: AuthenticationResponse = {};
  otpCode: string[] = ['', '', '', '', '', ''];

  constructor(
    private authService: AuthService,
    private router: Router,
    // private toastr: ToastrService
    private toast: NgToastService
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

    // if (!password || !this.isPasswordStrong(password)) {
    //   console.log(
    //     'Password is not strong. It should be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one special character.'
    //   );
    //   this.showWarning1() ;
    //   return;
    // }
    if (!email || !this.isGmailFormat(email)) {
      console.log('Email is not in Gmail format.');//
      // this.toastr.warning('Email is not in Gmail format');
      this.showWarning2() 
      return;
    }
    this.authService.register(this.registerRequest).subscribe({
      next: (response) => {
        if (response) {
          console.log("response",response);//
          this.isSuccessful = true;
          this.isSignUpFailed = false;
          this.authResponse = response; 
        
        } else {
          this.showSuccess();
          setTimeout(() => {
            this.router.navigate(['login']);
          }, 3000);
        }
      }, error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
  }

  verifyTfa() {
    const verifyRequest: VerificationRequest = {
      email: this.registerRequest.email,
      code: this.otpCode.join(''), // Convert otpCode array to string
    };
    this.authService.verifyCode(verifyRequest).subscribe({
      next: (response) => {
        this.showSuccess();
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

    showSuccess() {
    this.toast.success({
      detail:"Success Message",
      summary:'Account created successfully\n Please Login',
      duration:3000,
       position:'topRight'})
  }
    showWarning1() {
    this.toast.warning({
      detail:"Warning Message",
      summary:'Password is not strong. It should be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one special character',
      duration:3000,
       position:'topRight'})
  }
    showWarning2() {
    this.toast.warning({
      detail:"Warning Message",
      summary:'Email is not in Gmail format',
      duration:3000,
       position:'topRight'})
  }
}
