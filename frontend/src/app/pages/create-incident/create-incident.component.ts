import { Component } from '@angular/core';
import { IncidentService } from '../../service/incident.service';
import { Incident } from '../../models/incident';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-incident',
  templateUrl: './create-incident.component.html',
  styleUrl: './create-incident.component.css'
})
export class CreateIncidentComponent {
  constructor(private incidentService: IncidentService, private router:Router){ }
  timeAnalyse: number = 0;
  incident: Incident = new Incident();
  logSelectedIncidentType() {
  }

  ngOnInit(): void {
  }

  saveIncident(){

      this.incidentService.createIncident(this.incident).subscribe( data =>{console.log(data);
      this.goToIncidentList();
    },
    error => console.log(error));

  }
  goToIncidentList(){
    this.router.navigate(['/incidentlogging']);
    this.router.navigate(['/escalation']);

  }
  onSubmit() {
    console.log(this.incident);
    this.saveIncident();
  }
  incrementTimeAnalyse() {
    this.incident.timeAnalyse += 5;
  }
}
