import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private baseUrl = 'http://localhost:8080/api/v1/test';

  constructor(private http: HttpClient) { }

  getPublicContent(): Observable<any> {
    return this.http.get(`${this.baseUrl }/all`, { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(`${this.baseUrl}/user`, { responseType: 'text' });
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(`${this.baseUrl}/mod`, { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin`, { responseType: 'text' });
  }
}
