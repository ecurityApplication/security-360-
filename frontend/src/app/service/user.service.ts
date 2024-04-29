import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:8080/api/v1/user';

  constructor(private httpClient: HttpClient,private storageService: StorageService) {}

  createUser(user: User): Observable<Object> {
    return this.httpClient.post<User>(`${this.baseUrl}/Add-user`, user);
  }

  getUser(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.baseUrl}/getAllUsers`);
  }
  
  updateUser(id: number, user: User): Observable<any> {
    return this.httpClient.put(`${this.baseUrl}/updateUser/${id}`, user);
  }

  deleteUser(id: number) {
    return this.httpClient.delete(`${this.baseUrl}/remove-user/${id}`);
  }

  public getUserById(id:number) {
    return this.httpClient.get<User>(`${this.baseUrl}/getUserById/${id}`);
  }

  getUserCountPerRole() {
    return this.httpClient.get<any>(`${this.baseUrl}/user-count`);
  }

  public forUser() {
    return this.httpClient.get(`${this.baseUrl}/forUser`);
  }

  public forAdmin() {
    return this.httpClient.get(`${this.baseUrl}/forAdmin`);
  }

  public forMod() {
    return this.httpClient.get(`${this.baseUrl}/forMod`);
  }

}
