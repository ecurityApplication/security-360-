import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient,  HttpErrorResponse } from '@angular/common/http';
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

  public createIncident(incident:FormData){
    return this.httpClient.post<Incident>("http://localhost:8080/api/v1/incidents/add",incident);
  }
  // createescalation(incident: Incident): Observable<Object>{
  //   return this.httpClient.post(`${this.baseURL}/escalation`,incident)
  //     }
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
 
 
  

  updateIncident(id: number, incident: Incident): Observable<any> {
    return this.httpClient.put(`${this.baseURL}/update/${id}`, incident);
  }

  deleteIncident(id: number) {
    return this.httpClient.delete(`${this.baseURL}/delete/${id}`);
  }


  getIncidentByCategory(category: string): Observable<Incident> {
    return this.httpClient.get<Incident>(
      `${this.baseURL}/getByCategory/${category}`
    );
  }

  getIncidentByDate(date: Date): Observable<Incident> {
    return this.httpClient.get<Incident>(`${this.baseURL}/byDate`, { params: { date: date.toISOString() } });
  }

  //Number of events per analyst
  getEventsPerAnalyst(): Observable<{ [key: string]: number }> {
    return this.httpClient.get<{ [key: string]: number }>(`${this.baseURL}/events-per-analyst`);
  }

//Number of alerts per plant
getIncidentCountByPlantNameAndMonth(): Observable<{ [key: string]: { [key: string]: number } }> {
  return this.httpClient.get<{ [key: string]: { [key: string]: number } }>(`${this.baseURL}/count-by-plant-and-month`);
}

//Tickets raised/incidents
getTicketRaisedPerIncident(): Observable<{ [key: string]: number }> {
  return this.httpClient.get<{ [key: string]: number }>(`${this.baseURL}/tickets-raised-per-month`);
}

//Number of treated incidents by severity
getIncidentsBySeverityLevel(): Observable<[string, number][]> {
  return this.httpClient.get<[string, number][]>(`${this.baseURL}//count-by-severity-level"`);
}

//
getCurrentMonthIncidentCounts(): Observable<any[]> {
  return this.httpClient.get<any[]>(`${this.baseURL}/monthly-counts/current`);
}
getEventsPerAnalystYearly(): Observable<any[]> {
  return this.httpClient.get<any[]>(`${this.baseURL}/events-per-analyst-yearly`);
}
//Tickets raised/incidents Yearly
getTicketsRaisedInCurrentYear(): Observable<{ year: string; ticketsRaisedYes: number; ticketsRaisedNo: number }[]> {
  return this.httpClient.get<{ year: string; ticketsRaisedYes: number; ticketsRaisedNo: number }[]>(`${this.baseURL}/tickets-raised-in-current-year`);
}

getIncidentCountForCurrentYear() {
  return this.httpClient.get<number>(`${this.baseURL}/incident/count/currentYear`);
}
getIncidentCountByMonthForCurrentYear(): Observable<Map<number, number>> {
  return this.httpClient.get<Map<number, number>>(`${this.baseURL}/incident/count/month/currentYear`);
}
}
