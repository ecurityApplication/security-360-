import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RegisterRequest} from "../../models/register-request";
import {AuthenticationResponse} from "../../models/authentication-response";
import {Observable} from "rxjs";
import {Incident} from "../../models/incident-model";

@Injectable({
  providedIn: 'root'
})
export class IncidentService {
  private baseUrl = 'http://localhost:8080/api/v1/incident'
  constructor(
    private http: HttpClient
  ) {
  }
 getIncident() :Observable<Incident>{
    return this.http.get<Incident>(this.baseUrl);
  }
  getIncidentById(id: number) :Observable<Incident>{
    return this.http.get<Incident>(this.baseUrl + id);
  }
  createIncident(incident: Incident) :Observable<Incident>{
    return this.http.post<Incident>(this.baseUrl, incident);
  }
  updateIncident(id: number,incident: Incident) :Observable<Incident>{
    return this.http.put<Incident>(this.baseUrl + incident.id, incident);
  }
  deleteIncident(id: number) :Observable<Incident>{
    return this.http.delete<Incident>(this.baseUrl + id);
  }
}
