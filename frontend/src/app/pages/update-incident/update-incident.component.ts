import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Incident } from '../../models/incident';
import { IncidentService } from '../../service/incident.service';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-update-incident',
  templateUrl: './update-incident.component.html',
  styleUrl: './update-incident.component.css',
})
export class UpdateIncidentComponent implements OnInit {
  incident: Incident = new Incident();
  id!: number;
  users!: User[];
  
  constructor(
    private incidentService: IncidentService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(){
    this.getById();
    this.getUser();
  }
  getById(): void {
    this.id = this.route.snapshot.params['id'];
    this.incidentService.getIncidentById(this.id).subscribe(
      (data) => {
        this.incident = data;
      },
      (error) => console.log(error)
    );
  }
  getUser() {
    this.userService.getUser().subscribe(
      (user) => {
        this.users = user;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  
  //update incident
  onSubmit() {
    this.incidentService.updateIncident(this.id, this.incident).subscribe(
      (data) => {
        this.goToIncidentList();
        Swal.fire('Success!', 'Incident updated successfully.', 'success');
      },
      (error) => {
        console.error('Error updating incident:', error);
        Swal.fire('Error!', 'Failed to update incident.', 'error');
      }
    );
  }

  //navigate to incidentlogging
  goToIncidentList() {
    this.router.navigate(['/layout/incidentlogging']);
  }
}
