import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RegisterRequest} from "../models/register-request";
import {AuthenticationResponse} from "../models/authentication-response";
import {AuthenticationRequest} from "../models/authentication-request";
import {VerificationRequest} from "../models/verification-request";

import { Observable } from 'rxjs';
import { PasswordRequestUtil } from '../models/PasswordRequestUtil';
import { PasswordRequestUtilnewpassword } from '../models/PasswordRequestUtilnewpassword';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/api/v1/auth'

  constructor(
    private http: HttpClient
  ) { }

  register(
    registerRequest: RegisterRequest
  ) {
    return this.http.post<AuthenticationResponse>
    (`${this.baseUrl}/register`, registerRequest);
  }

  login(
    authRequest: AuthenticationRequest
  ) {
    return this.http.post<AuthenticationResponse>
    (`${this.baseUrl}/authenticate`, authRequest);
  }

  verifyCode(verificationRequest: VerificationRequest) {
    return this.http.post<AuthenticationResponse>
    (`${this.baseUrl}/verify`, verificationRequest);
  }

  resetPasswordRequest(passwordRequest:PasswordRequestUtil) { 
  // resetPasswordRequest(email:string):Observable<string> {
    return this.http.post<PasswordRequestUtil>
    (`${this.baseUrl}/password-reset-request`, passwordRequest);
  }

  resetPassword(passwordRequestUtilnewpassword:PasswordRequestUtilnewpassword){
    return this.http.post<PasswordRequestUtilnewpassword>
    (`${this.baseUrl}/reset-password`, passwordRequestUtilnewpassword);
 }
 
 
   logout(): Observable<any> {
      return this.http.post<any>(`${this.baseUrl}/logout`, {});
   }
  
}
