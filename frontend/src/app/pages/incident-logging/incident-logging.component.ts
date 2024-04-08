import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IncidentService } from '../../service/incident.service';
import { Incident } from '../../models/incident';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {
  ConfirmBoxInitializer,
  DialogLayoutDisplay,
  DisappearanceAnimation,
  AppearanceAnimation,
  IConfirmBoxPublicResponse
} from '@costlydeveloper/ngx-awesome-popup';
import { ShowDialogComponent } from '../../show-dialog/show-dialog.component';
import { error } from 'jquery';
import { HttpErrorResponse } from '@angular/common/http';
import { ImageProcessingService } from '../../image-processing.service';
import { map } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-incident-logging',
  templateUrl: './incident-logging.component.html',
  styleUrl: './incident-logging.component.css'
})
export class IncidentLoggingComponent implements OnInit {
  constructor(private incidentService :IncidentService ,private router :Router, 
    public imagesDialog: MatDialog,
    private imageProcessingService: ImageProcessingService
  ){ }

  incidents: Incident[] = [];
  // public data: any;
  ngOnInit(): void {

    this.getIncident()
    // this.receiveImages();

 }
 
//  receiveImages() {
//   console.log(this.data);
//  }
//    getIncident(){
//    this.incidentService.getIncidentList().subscribe(data=>{
//     // console.log(this.incidents);
//      this.incidents = data;
     
//    } , error => {
//     console.error(error)
//    })

//  }
public getIncident(){
  this.incidentService.getIncidentList()
  .pipe(
    map((x: Incident[], i) => x.map((incident: Incident) => this.imageProcessingService.createImages(incident)))
  )
  
  .subscribe(
    (resp:Incident[])=>{
      console.log(resp);
      this.incidents = resp;
    },(error:HttpErrorResponse)=>
      {console.log(error);

      }
  
  );

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
openConfirmBox(id : number) {
  const newConfirmBox = new ConfirmBoxInitializer();

  newConfirmBox.setTitle('Confirm Deletion');
  newConfirmBox.setMessage('Are you sure you want to delete this incident?');

  newConfirmBox.setConfig({
    layoutType: DialogLayoutDisplay.DANGER,
    animationIn: AppearanceAnimation.BOUNCE_IN,
    animationOut: DisappearanceAnimation.BOUNCE_OUT,
  });
  //  newConfirmBox.openConfirmBox$();
  let confirmed = false;

  const subscription = newConfirmBox.openConfirmBox$().subscribe(() => {
    confirmed = true;
    subscription.unsubscribe(); // Unsubscribe to prevent multiple calls if the user clicks confirm multiple times
  });

  subscription.add(() => {
    if (confirmed) {
      this.deleteIncident(id); // Trigger deletion if confirmed
    } else {
      // Handle case where deletion is not confirmed
    }
  });



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

getSeverityClass(severityLevel: string): string {
  switch (severityLevel) {
    case 'Informational':
      return 'green-bg';
    case 'Low':
      return 'yellow-bg';
    case 'Medium':
      return 'orange-bg';
    case 'High':
      return 'red-bg';
    case 'Critical':
      return 'redred-bg';
    default:
      return ''; 
  }
}

gettypeClass(incidentType: string): string {
  switch (incidentType) {
    case 'Major incident':
      return 'green-bg';
    case 'Minor Incident':
      return 'red-bg';
   
    default:
      return '';
  }
}

getStatusClass(incidentStatus: string): string {
  switch (incidentStatus) {
    case 'Open':
      return 'green-bg';
    case 'Closed':
      return 'orange-bg';
   
    default:
      return '';
  }
}
getHostClass(hostStatus: string): string {
  switch (hostStatus) {
    case 'Contained':
      return 'red-bg';
    case 'NOT-Contained':
      return 'green-bg';
   
    default:
      return '';
  }
}
showImages(incident: Incident) {
  console.log(incident);
  this.imagesDialog.open(ShowDialogComponent, {
    data:{
      images:incident.incidentImages,
      title:incident.title,
      date:incident.date,
      severity:incident.severityLevel,
      plantName:incident.plantName,
      hostName:incident.hostName,
      category:incident.category,
      raisedBy:incident.raisedBy,
      userName:incident.userName,
      incidentid:incident.incidentID,
      incidentStatus:incident.incidentStatus,
      ticketRaised:incident.ticketRaised,
      hostStatus:incident.hostStatus,
      investigation:incident.investigation,
      remediation:incident.remediation,
      remediationOwner:incident.remediationOwner,
      dateTarget:incident.dateTarget,
      firstEvent:incident.firstEvent,
      acknowledge:incident.acknowledge,
      timeAnalyse:incident.timeAnalyse,
      analyst:incident.analyst,
      reviewer:incident.reviewer










      


    },
      height: '1500px',
      width: '1000px'
  });

  
}
// incidentDetails(id: number,incident:Incident) {
//   this.router.navigate(['incident-details', id]),
//   {
//     data:{
//       images:incident.incidentImages

//     },

//   }
// }

}
