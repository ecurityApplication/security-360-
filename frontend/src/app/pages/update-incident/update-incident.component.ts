import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Incident} from "../../models/incident";
import {IncidentService} from "../../service/incident.service";
import Swal from 'sweetalert2';


@Component({
  selector: 'app-update-incident',
  templateUrl: './update-incident.component.html',
  styleUrl: './update-incident.component.css'
})
export class UpdateIncidentComponent implements OnInit{
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
  Swal.fire('Success!', 'Incident updated successfully.', 'success');
}, (error) => {
  console.error('Error updating incident:', error);
  Swal.fire('Error!', 'Failed to update incident.', 'error');
}
);
  }
  goToIncidentList(){
    this.router.navigate(['/incidentlogging']);
  }
}

