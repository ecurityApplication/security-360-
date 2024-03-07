import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import {Incident} from "../../models/incident";
import {IncidentService} from "../../service/incident.service";

@Component({
  selector: 'app-create-incident',
  templateUrl: './create-incident.component.html',
  styleUrl: './create-incident.component.css'
})
export class CreateIncidentComponent implements OnInit  {
  incident: Incident = new Incident();
  constructor(private incidentService: IncidentService, private router:Router){ }

  ngOnInit(): void {
  }

  saveIncident(){

      this.incidentService.createIncident(this.incident).subscribe( data =>{console.log(data);
      this.goToIncidentList();
    },
    error => console.log(error));

  }
  goToIncidentList(){
    this.router.navigate(['/incidents']);
  }
  onSubmit() {
    console.log(this.incident);
    this.saveIncident();
  }

}
