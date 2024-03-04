import {Component, OnInit} from '@angular/core';
import {Incident} from "../../../../models/incident-model";
import {IncidentService} from "../../../service/incident.service";
import {Router} from "@angular/router";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";

@Component({
  selector: 'app-create-incident',
  templateUrl: './create-incident.component.html',
  styleUrl: './create-incident.component.css'
})
export class CreateIncidentComponent implements OnInit {
  incident:Incident = new Incident();
  submitted=false;
  constructor(
    private incidentService:IncidentService,
    private router: Router
  ) {
  }

  ngOnInit() {
    }

  onSubmit() {
    this.submitted= true;
    this.incidentService.createIncident(this.incident)
      .subscribe(data=>console.log(data),error => console.log(error));
    this.incident = new Incident();
    this.router.navigate(['/incident']);
  }

  protected readonly Incident = Incident;
}
