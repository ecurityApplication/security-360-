import { Component } from '@angular/core';
import {VerificationRequest} from "../../../models/verification-request";
import {AuthenticationRequest} from "../../../models/authentication-request";
import {AuthenticationResponse} from "../../../models/authentication-response";
import {Router, RouterLink} from "@angular/router";
import {NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {AuthenticationService} from "../../services/authentication.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    NgIf
  ],
  styleUrl: './login.component.css'
})
export class LoginComponent {

  authRequest: AuthenticationRequest = {};
  otpCode: any;
  authResponse: AuthenticationResponse = {};
  message = '';

  constructor(
    private authService: AuthenticationService,
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
            alert('in')
            localStorage.setItem('token', response.accessToken as string);
            ////this.router.navigate(['welcome']);
          }
        }
      })
  }

  verifyCode() {
    this.message = '';
    const verifyRequest : VerificationRequest = {
      email:this.authRequest.email,
      code:this.otpCode
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
}
