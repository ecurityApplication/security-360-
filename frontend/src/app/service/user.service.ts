import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Analyste } from '../models/analyste';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private baseUrl = 'http://localhost:8080/api/v1/user';

  constructor(private httpClient: HttpClient) { }

  // public createAnalyste(analyste: Analyste){
  //   return this.httpClient.post<Analyste>("http://localhost:8080/api/v1/user/Add-user",analyste);

  // }
  // createIncident(incident:Incident): Observable<Object>{
  //   return this.httpClient.post(${this.baseURL}/add,incident);

  // }
  createAnalyste(analyste: Analyste): Observable<Object>{
return this.httpClient.post(`${this.baseUrl}/Add-user`,analyste)
  }

  

  getAnalysteList(): Observable<Analyste[]> {
    return this.httpClient.get<Analyste[]>(`${this.baseUrl}/retrieve-all-user`);
  }
  updateAnalyste(id: number, analyste: Analyste): Observable<any> {
    return this.httpClient.put(`${this.baseUrl}/modifyuser/${id}`, analyste);
  }
  

  deleteAnalyste(id: number) {
    return this.httpClient.delete(`${this.baseUrl}/remove-user/${id}`);
  }



  
}
