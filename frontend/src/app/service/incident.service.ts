import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Incident } from '../models/incident';

@Injectable({
  providedIn: 'root'
})
export class IncidentService {
 
  
  private baseURL = "http://localhost:8080/api/v1/incident";


  constructor(private httpClient: HttpClient) { }

  getIncidentList(): Observable<Incident[]>{
    return this.httpClient.get<Incident[]>(`${this.baseURL}`);
  }
//   private createAuthorizationHeader(){
// const jwtToken = localStorage.getItem('jwt');
// if(jwtToken){
//   console.log("jwt token found in local storage",jwtToken);
//   return new HttpHeaders().set(
//     "Authorization", "Bearer" + jwtToken
//     );
// }else{
//   console.log("jwt token not found in local storage"); 
// }
// return null;
//   }
  createIncident(incident:Incident): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}`,incident);

  }

  updateIncident(id: number, incident: Incident): Observable<any>{
    return this.httpClient.put(`${this.baseURL}/${id}`, incident);
  }

  deleteIncident(id : number){
    return  this.httpClient.delete(`${this.baseURL}/${id}`)
  }

  getIncidentById(id: number):Observable<Incident> {
    return  this.httpClient.get<Incident>(`${this.baseURL}/${id}`)
  }


}
