import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Incident } from '../models/incident';

@Injectable({
  providedIn: 'root'
})
export class IncidentService {
 
  
  private baseURL = "http://localhost:8080/api/v1/incidents";


  constructor(private httpClient: HttpClient) { }

  getIncidentList(): Observable<Incident[]>{
    return this.httpClient.get<Incident[]>(`${this.baseURL}/getAll`);
  }

  public createIncident(incident:FormData){
    return this.httpClient.post<Incident>("http://localhost:8080/api/v1/incidents/add",incident);
  }
  //   getIncidentById(id: number):Observable<Incident> {
  //   return  this.httpClient.get<Incident>(`${this.baseURL}/getById/${id}`)
  // }

  public getIncidentById(id:number) {
    return this.httpClient.get<Incident>("http://localhost:8080/api/v1/incidents/getById/"+id);
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

  // createIncident(incident:Incident): Observable<Object>{
  //   return this.httpClient.post(`${this.baseURL}/add`,incident);

  // }
 
 
  

  updateIncident(id: number, incident: Incident): Observable<any>{
    return this.httpClient.put(`${this.baseURL}/update/${id}`, incident);
  }

  deleteIncident(id : number){
    return  this.httpClient.delete(`${this.baseURL}/delete/${id}`)
  }




}
