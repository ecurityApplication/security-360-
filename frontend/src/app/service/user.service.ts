import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:8080/api/v1/user';

  constructor(private httpClient: HttpClient) {}

  createUser(user: User): Observable<Object> {
    return this.httpClient.post<User>(`${this.baseUrl}/Add-user`, user);
  }

  getUser(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.baseUrl}/getAllUsers`);
  }

  updateUser(id: number, user: User): Observable<any> {
    return this.httpClient.put(`${this.baseUrl}/updateUser/${id}`, User);
  }

  deleteUser(id: number) {
    return this.httpClient.delete(`${this.baseUrl}/remove-user/{id}${id}`);
  }
}
