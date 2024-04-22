import { HttpClient } from '@angular/common/http';
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

 
  changePassword(request: ChangePasswordReset): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/change-password`, request);
  }
  
}
