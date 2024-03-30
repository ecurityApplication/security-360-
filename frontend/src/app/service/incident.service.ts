import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Incident } from '../models/incident';

@Injectable({
  providedIn: 'root',
})
export class IncidentService {

  private baseURL = 'http://localhost:8080/api/v1/incidents';

  constructor(private httpClient: HttpClient) {}

  getIncidentList(): Observable<Incident[]> {
    return this.httpClient.get<Incident[]>(`${this.baseURL}/getAll`);
  }

  createIncident(incident: Incident): Observable<Object> {
    return this.httpClient.post(`${this.baseURL}/add`, incident);
  }

  updateIncident(id: number, incident: Incident): Observable<any> {
    return this.httpClient.put(`${this.baseURL}/update/${id}`, incident);
  }

  deleteIncident(id: number) {
    return this.httpClient.delete(`${this.baseURL}/delete/${id}`);
  }

  getIncidentById(id: number): Observable<Incident> {
    return this.httpClient.get<Incident>(`${this.baseURL}/getById/${id}`);
  }

  getIncidentByCategory(category: string): Observable<Incident> {
    return this.httpClient.get<Incident>(
      `${this.baseURL}/getByCategory/${category}`
    );
  }

  getIncidentByDate(date: Date): Observable<Incident> {
    return this.httpClient.get<Incident>(`${this.baseURL}/byDate`, { params: { date: date.toISOString() } });
  }
}
