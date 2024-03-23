import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IncidentService } from '../../service/incident.service';
import { Incident } from '../../models/incident';

@Component({
  selector: 'app-incident-logging',
  templateUrl: './incident-logging.component.html',
  styleUrl: './incident-logging.component.css'
})
export class IncidentLoggingComponent {
  sideBarOpen: boolean | undefined;

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;


  }
  incidents: Incident[] = [];
  constructor(private incidentService :IncidentService ,private router :Router ){ }
  ngOnInit(): void {
    this.getIncident()
 }
   getIncident(){
   this.incidentService.getIncidentList().subscribe(data=>{
    console.log(this.incidents);
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
      console.log(data);
      this.getIncident();
    })
}
incidentDetails(id: number) {
  this.router.navigate(['incident-details', id]);
}
}
