import { Component } from '@angular/core';
import {Router,RouterLink} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {RegisterRequest} from "../../models/register-request";
import {AuthenticationResponse} from "../../models/authentication-response";
import {VerificationRequest} from "../../models/verification-request";
import {AuthService} from "../../service/auth.service";


@Component({
  selector: 'app-register',

  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    NgIf
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerRequest: RegisterRequest = {};
  authResponse: AuthenticationResponse = {};
  message = '';
  otpCode = '';

  constructor(
    private  authService: AuthService,
    private router: Router
  ) {
  }
  registerUser() {
    this.message = '';
    this.authService.register(this.registerRequest)
      .subscribe({
        next:(response)=>{
          if(response) {
            this.authResponse = response;
          } else {
            this.message = 'Account created successfully\nYou will be redirected to the Login page in 3 seconds';
            setTimeout(()=>{
              this.router.navigate(['login'])
            },3000)
          }
        }
      })
  }

  verifyTfa() {
    this.message = '';
    const verifyRequest : VerificationRequest = {
      email:this.registerRequest.email,
      code:this.otpCode
    };
    this.authService.verifyCode(verifyRequest)
      .subscribe({
        next:(response)=>{
          this.message = 'Account created successfully\nYou will be redirected to the Welcome page in 3 seconds';
          setTimeout(() => {
            localStorage.setItem('token', response.accessToken as string);
            this.router.navigate(['welcome']);
          }, 3000);
        }
      })
  }
}
