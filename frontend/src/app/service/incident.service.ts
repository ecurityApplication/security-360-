import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
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
  createIncident(incident:Incident): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}`,incident);

  }


}
