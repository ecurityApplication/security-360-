import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChangePasswordResetRequest } from '../models/ChangePasswordResetRequest';
import { ChangePasswordReset } from '../models/ChangePasswordReset';

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordResetService {

  private baseUrl = 'http://localhost:8080/api/v1/changermdp'

  constructor(
    private http: HttpClient
  ) { }

 
  changePassword(request: ChangePasswordReset): Observable<string> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.post<string>(`${this.baseUrl}/change-password`, request, { headers });
  }
  
}
