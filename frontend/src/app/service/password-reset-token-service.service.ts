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
    // private changePassword: ChangePasswordResetRequest
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
//   verifyOtp(otp: number, email: string): Observable<any> {
//     const url = `${this.baseUrl}/verifyOtp/${otp}/${email}`;
//     return this.http.post(url, null);
//   }

//  changePasswordHandler(email: string, changePassword: ChangePasswordResetRequest): Observable<any> {
//     return this.http.post(`${this.baseUrl}/resetPassword/${email}`, changePassword);
//   }

}
