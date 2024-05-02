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

  public getIncidentList(searchKeyword: string = ""): Observable<Incident[]> {
    return this.httpClient.get<Incident[]>(`${this.baseURL}/getAll?searchKey=`+searchKeyword);
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

  updateIncident(id: number, incident: Incident): Observable<any> {
    return this.httpClient.put(`${this.baseURL}/update/${id}`, incident);
  }

  deleteIncident(id: number) {
    return this.httpClient.delete(`${this.baseURL}/delete/${id}`);
  }
 
  getIncidentCountsByCategory(): Observable<Array<any>> {
    return this.httpClient.get<any[]>(`${this.baseURL}/countByCategory`);
  }
  
  getIncidentCountsByraisedby(): Observable<Array<any>> {
    return this.httpClient.get<any[]>(`http://localhost:8080/api/v1/incidents/countByRaisedBy`, {
    });
  }

  getIncidentByCategory(category: string): Observable<Incident> {
    return this.httpClient.get<Incident>(
      `${this.baseURL}/getByCategory/${category}`
    );
  }

  getIncidentByDate(date: Date): Observable<Incident> {
    return this.httpClient.get<Incident>(`${this.baseURL}/byDate`, { params: { date: date.toISOString() } });
  }
  
  //MTTA
  getAverageTimeAnalyseCurrentMonth(): Observable<number> {
    return this.httpClient.get<number>(`${this.baseURL}/average-time-analyse-current-month`);
  }
  //MTTR
  getAverageMttr(): Observable<number> {
    return this.httpClient.get<number>(`${this.baseURL}/average-mttr`);
  }
  //Number of events per analyst
  // getEventsPerAnalyst(): Observable<{ [key: string]: number }> {
  //   return this.httpClient.get<{ [key: string]: number }>(`${this.baseURL}/events-per-analyst`);
  // }


//Number of alerts per plant
getIncidentCountByPlantNameAndMonth(): Observable<{ [key: string]: { [key: string]: number } }> {
  return this.httpClient.get<{ [key: string]: { [key: string]: number } }>(`${this.baseURL}/count-by-plant-and-month`);
}

//Tickets raised/incidents
getTicketsRaisedInCurrentMonth() {
  return this.httpClient.get(`${this.baseURL}/tickets-raised-per-month`);
}
//FPR
falsePositiveRatingOfCurrentMonth(): Observable<number> {
  return this.httpClient.get<number>(`${this.baseURL}/averageFalsePositiveCurrentMonth`);
}

//Number of treated incidents by severity year
getIncidentsBySeverityLevelyear(): Observable<{ [key: string]: number }> {
  return this.httpClient.get<{ [key: string]: number }>(`${this.baseURL}/severity-level-count-year`);
}
//Number of treated incidents by severity month
getIncidentsBySeverityLevelmonth(): Observable<{ [key: string]: number }> {
  return this.httpClient.get<{ [key: string]: number }>(`${this.baseURL}/count-by-severity-level`);
}


    // getIncidentsBySeverityLevel(): Observable<any[]> {
    //   return this.httpClient.get<any[]>(`${this.baseURL}/count-by-severity-level`);
    // }
//
getCurrentMonthIncidentCounts(): Observable<number> {
  return this.httpClient.get<number>(`${this.baseURL}/current-month-count`);
}
//EVENT PER ANALYSTE YEARLY 
// getEventsPerAnalystYearly(): Observable<any[]> {
//   return this.httpClient.get<any[]>(`${this.baseURL}/events-per-analyst-yearly`);
// }

getEventsPerAnalystYearly(): Observable<{ [key: string]: number }> {
  return this.httpClient.get<{ [key: string]: number }>(`${this.baseURL}/events-per-analyst-year`);
}
 //Number of events per analyst monthly 

getEventsPerAnalyst(): Observable<{ [key: string]: number }> {
  return this.httpClient.get<{ [key: string]: number }>(`${this.baseURL}/events-per-analyst`);
}

//  getEventsPerAnalyst(): Observable<{ [key: string]: number }> {
//   return this.httpClient.get<{ [key: string]: number }>(`${this.baseURL}/events-per-analyst`);
// }
//Tickets raised/incidents Yearly
getTicketsRaisedInCurrentYear(): Observable<{ year: string; ticketsRaisedYes: number; ticketsRaisedNo: number }[]> {
  return this.httpClient.get<{ year: string; ticketsRaisedYes: number; ticketsRaisedNo: number }[]>(`${this.baseURL}/tickets-raised-in-current-year`);
}

numberOfIncidentCountForCurrentYear() {
  return this.httpClient.get<number>(`${this.baseURL}/incident/count/currentYear`);
}

getIncidentsPerMonthCurrentYear(){
  return this.httpClient.get<Map<string, number>>(`${this.baseURL}/count-per-month-current-year`); 
}
  //MTTA
  falsePositiveRatingOfCurrentYear(): Observable<number> {
    return this.httpClient.get<number>(`${this.baseURL}/averageFalsePositiveCurrentYear`);
  }
  //FPR
}
