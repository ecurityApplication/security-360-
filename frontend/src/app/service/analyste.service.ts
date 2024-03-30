import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnalysteService {
  private baseURL = "http://localhost:8080/api/v1/user";


  constructor(private httpClient: HttpClient) { }
}
