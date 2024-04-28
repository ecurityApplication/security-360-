import { Component, OnInit } from '@angular/core';
import { Incident } from '../../models/incident';
import { IncidentService } from '../../service/incident.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

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
  Swal.fire('Success!', 'Escalation updated successfully.', 'success');
}, error => {
  console.error('Error updating escalation:', error);
  Swal.fire('Error!', 'Failed to update escalation.', 'error');
});
  }
  goToIncidentList(){
    this.router.navigate(['/layout/escalation']);
  }
}
