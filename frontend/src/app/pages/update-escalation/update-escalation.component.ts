import { Component, OnInit } from '@angular/core';
import { Incident } from '../../models/incident';
import { IncidentService } from '../../service/incident.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-escalation',
  templateUrl: './update-escalation.component.html',
  styleUrl: './update-escalation.component.css'
})
export class UpdateEscalationComponent implements OnInit {
  incident: Incident = new  Incident();
  id!: number;
  constructor(
    private incidentService:IncidentService,
    private route: ActivatedRoute,
    private router:Router) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.incidentService.getIncidentById(this.id).subscribe(data => {
      console.log(data)
      this.incident = data;
    }, error => console.log(error));
  }

  onSubmit() {
this.incidentService.updateIncident(this.id,this.incident).subscribe(data =>{
  this.goToIncidentList();
}, error => console.log(error));
  }
  goToIncidentList(){
    this.router.navigate(['/escalation']);
  }
}
