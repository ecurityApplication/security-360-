import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthenticationRequest } from '../../models/authentication-request';
import { AuthenticationResponse } from '../../models/authentication-response';
import { AuthService } from '../../service/auth.service';
import { Router, RouterLink } from '@angular/router';
import { VerificationRequest } from '../../models/verification-request';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from '../../service/storage.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [FormsModule, NgIf, RouterLink],
  styleUrl: './login.component.css',
})
export class LoginComponent {
  authRequest: AuthenticationRequest = {};
  otpCode: string[] = ['', '', '', '', '', '']; // Array to store individual digits
  authResponse: AuthenticationResponse = {};


  username?: string;
  showUser = true;
  roles: string[] = [];

  @ViewChild('input1') input1!: ElementRef;
  @ViewChild('input2') input2!: ElementRef;
  @ViewChild('input3') input3!: ElementRef;
  @ViewChild('input4') input4!: ElementRef;
  @ViewChild('input5') input5!: ElementRef;

  constructor(
    private authService: AuthService,
    private router: Router,
    // private toastr: ToastrService,
    private storageService: StorageService,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {}

  authenticate() {
    this.authService.login(this.authRequest).subscribe({
      next: (response:any) => {
        this.authResponse = response;
         if (this.authResponse.mfaEnabled) {
           // Check if admin is disabled
          //  if (!this.authResponse.enabled) {
          //   this.showAdminDisabledAlert();
          // } else {
          console.log("response login ",response);
          localStorage.setItem('token', response.accessToken);
          localStorage.setItem('role', response.role);
          // }
          //localStorage.setItem('refreshToken', response.refreshToken as string);
          //localStorage.setItem('role', response.role as string);
          

         } else {
       // If login fails, show toaster message
           this.showInfo();
         }
      },error: (err) => { 
        if (err.status === 403) {
          this.showError2();
        }
      }
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
        // console.log('token');
        // localStorage.setItem('token', res.accessToken as string);
        this.router.navigate(['/layout/incidentlogging']);
      
    } ,  (error) => {
       
      if (error.status === 403) {
        // Password is incorrect, show error message
        //this.toastr.error('Incorrect verification code!', 'Verification Error');
        this.showError2();
      }
    });
  }

  focusNext(nextInput: HTMLInputElement): void {
    nextInput.focus();
  }

 
  showAdminDisabledAlert() {
    this.toast.info({
      detail: 'Admin account disabled. Contact support for assistance.',
      summary: 'Admin Account Disabled',
      duration: 5000, // Adjust duration as needed
      position: 'topRight',
    });
  }
  showInfo() {
    this.toast.info({
      detail:"Info Message",
      summary:'Login Failed. Try again later!, Login Status',
      duration:3000,
       position:'topRight'})
  }

  showError1() {
    this.toast.error({
      detail:"Info Message",
      summary:'Incorrect email or password! ,Login Error',
      duration:3000,
       position:'topRight'})
  }
  
  showError2() {
    this.toast.error({
      detail:"Info Message",
      summary:'Incorrect verification code!, Verification Error',
      duration:3000,
       position:'topRight'})
  }

  reloadPage(): void {
    window.location.reload();
  }
  
}