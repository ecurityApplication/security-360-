import { Component, OnInit } from '@angular/core';
import { Incident } from '../../models/incident';
import { IncidentService } from '../../service/incident.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-escalation',
  templateUrl: './escalation.component.html',
  styleUrl: './escalation.component.css'
})
export class EscalationComponent implements OnInit{
  incidents: Incident[] = [];
  constructor(private incidentService :IncidentService ,private router :Router ){ }
  ngOnInit(): void {
    this.incidentService.getIncidentList().subscribe((data :Incident[] )=> {
     this.incidents = data;
   });
}
}
