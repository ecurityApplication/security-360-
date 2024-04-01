import { Component, Inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IncidentService } from '../../service/incident.service';
import { Incident } from '../../models/incident';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-incident-logging',
  templateUrl: './incident-logging.component.html',
  styleUrl: './incident-logging.component.css'
})
export class IncidentLoggingComponent implements OnInit {
  incidents: Incident[] = [];
  // public data: any;
  constructor(private incidentService :IncidentService ,private router :Router ){ }
  ngOnInit(): void {
    this.getIncident()
    // this.receiveImages();

 }
 
//  receiveImages() {
//   console.log(this.data);
//  }
   getIncident(){
   this.incidentService.getIncidentList().subscribe(data=>{
    // console.log(this.incidents);
     this.incidents = data;
     
   } , error => {
    console.error(error)
   })

 }
 updateIncident(id:number){
  this.router.navigate(['update-incident', id]);

 }

  deleteIncident(id: number) {
    this.incidentService.deleteIncident(id).subscribe(data => {
      // console.log(data);
      this.getIncident();
    })
}
incidentDetails(id: number) {
  this.router.navigate(['incident-details', id]);
}

//incident id + date
 // Method to generate incident ID
 generateIncidentID(index: number): string {
  const today = new Date();
  const dateString = this.getDateString(today);
  const incidentID = index + 1; // Adding 1 to index to start from 1
  return dateString + '-' + incidentID.toString().padStart(2, '0'); // Pad the incident ID with zeros
}

// Method to get date string in the format YYYYMMDD
getDateString(date: Date): string {
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-indexed
  const day = date.getDate().toString().padStart(2, '0');
  return year +"/"+ month +"/"+ day;
}


}
