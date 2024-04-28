
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ChangePasswordRequest } from '../models/ChangePasswordRequest';

@Injectable({
  providedIn: 'root',
})
export class PasswordchangeService {
  private apiUrl = 'http://localhost:8080/api/v1/changermdp'; // Your API endpoint

  constructor(private http: HttpClient) {}

  changePassword(request: ChangePasswordRequest): Observable<any> {
    // Assuming you have a function to retrieve the authentication token
    const authToken = this.getAuthToken();

    // Set the headers with the authentication token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${authToken}`);

    // Make the PATCH request with headers
    return this.http.patch<any>(this.apiUrl, request, { headers });
  }

  // Example function to retrieve the authentication token
  private getAuthToken(): string {
    // Implement your logic to get the authentication token
    // This could be from a token stored in localStorage, sessionStorage, etc.
    return 'your_auth_token_here';
  }
}
