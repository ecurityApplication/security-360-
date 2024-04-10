import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from '../models/role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private baseUrl = 'http://localhost:8080/api/v1/role';

  constructor(private httpClient: HttpClient) {}

  createrole(role: Role): Observable<Object> {
    return this.httpClient.post<Role>(`${this.baseUrl}/Add-role`, role);
  }

  getRole(): Observable<Role[]> {
    return this.httpClient.get<Role[]>(`${this.baseUrl}/retrieve-all-role`);
  }
  
  updateRole(id: number, role: Role): Observable<any> {
    return this.httpClient.put(`${this.baseUrl}/modifyrole/${id}`, role);
  }

  deleterole(id: number) {
    return this.httpClient.delete(`${this.baseUrl}/remove-role/${id}`);
  }

  
}
