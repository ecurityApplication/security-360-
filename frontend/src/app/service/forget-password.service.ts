import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForgetPasswordService {
  private baseUrl = 'http://localhost:8080/api/v1/forget'

  constructor(
    private http: HttpClient,
    // private changePassword: ChangePasswordResetRequest
  ) { }

  verifyEmail(email: string): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/resetrequestpassword/${email}`, null);
  }

  verifyOtp(otp: number, email: string): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/verifyOtp/${otp}/${email}`, null);
  }

  // changePassword(changePassword: ChangePasswordResetRequest, email: string): Observable<string> {
  //   return this.http.post<string>(`${this.baseUrl}/resetPassword/${email}`, changePassword);
  // }
}
