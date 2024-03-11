import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import { Incident } from '../models/incident';

@Injectable({
  providedIn: 'root'
})
export class IncidentService {
  updateIncident(id: number, incident: Incident) {
    throw new Error('Method not implemented.');
  }
  private baseURL = "http://localhost:8080/api/v1/Incident";


  constructor(private httpClient: HttpClient) { }

  getIncidentList(): Observable<Incident[]>{
    return this.httpClient.get<Incident[]>(`${this.baseURL}`);
  }
  createIncident(incident:Incident): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}`,incident);

  }

  updateIndents(id: number, incident: Incident): Observable<any>{
    return this.httpClient.put(`${this.baseURL}/${id}`, incident);
  }

  deleteIncident(id : number){
    return  this.httpClient.delete(`${this.baseURL}/${id}`)
  }

  getIncidentById(id: number):Observable<Incident> {
    return  this.httpClient.get<Incident>(`${this.baseURL}/${id}`)
  }
}
