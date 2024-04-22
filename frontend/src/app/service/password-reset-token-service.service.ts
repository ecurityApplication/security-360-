import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChangePasswordResetRequest } from '../models/ChangePasswordResetRequest';

@Injectable({
  providedIn: 'root'
})
export class PasswordResetTokenServiceService {
  private baseUrl = 'http://localhost:8080/api/v1/forget'
  constructor(
    private http: HttpClient,
  ) { }

  verifyEmail(email: string): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/resetrequestpassword/${email}`, null);
  }
  
  verifyOtp(otp: number, email: string): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/verifyOtp/${otp}/${email}`, {});
  }

  changePasswordHandler(
    changePasswordRequest: ChangePasswordResetRequest,
    email: string
  ): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/resetPassword/${email}`, changePasswordRequest);
  }


}
