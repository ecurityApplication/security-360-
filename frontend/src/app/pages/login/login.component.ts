import { Component, ElementRef, ViewChild } from '@angular/core';
import {AuthenticationRequest} from "../../models/authentication-request";
import {AuthenticationResponse} from "../../models/authentication-response";
import {AuthService} from "../../service/auth.service";
import {Router, RouterLink} from "@angular/router";
import {VerificationRequest} from "../../models/verification-request";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    RouterLink
  ],
  styleUrl: './login.component.css'
})
export class LoginComponent {

  authRequest: AuthenticationRequest = {};
  // otpCode: any;
    otpCode: string[] = ['', '', '', '', '', '']; // Array to store individual digits
    authResponse: AuthenticationResponse = {};
    message = '';
    @ViewChild('input1') input1!: ElementRef;
    @ViewChild('input2') input2!: ElementRef;
    @ViewChild('input3') input3!: ElementRef;
    @ViewChild('input4') input4!: ElementRef;
    @ViewChild('input5') input5!: ElementRef;
  constructor(
      private authService: AuthService,
      private router: Router
  ) {
  }
  authenticate() {
    this.authService.login(this.authRequest)
        .subscribe({
          next:(response)=>{
            console.log('response ' , response)
            this.authResponse = response;
            if(this.authResponse.mfaEnabled) {
              localStorage.setItem('token', response.accessToken as string);
              //this.router.navigate(['welcome']);
            }
          }
        })
  }

  verifyCode() {
    this.message = '';
    const verifyRequest : VerificationRequest = {
      email:this.authRequest.email,
      code: this.otpCode.join('') // Combine OTP digits into a single string
      // code:this.otpCode
    };
    this.authService.verifyCode(verifyRequest)
        .subscribe({
          next:(response)=>{
            this.message = 'Account created successfully\nYou will be redirected to the Welcome page in 3 seconds';
            console.log('token')
            localStorage.setItem('token', response.accessToken as string);
            this.router.navigate(['welcome']);

          }
        })
  }
  
  focusNext(nextInput: HTMLInputElement): void {
    nextInput.focus();
  }

    
}