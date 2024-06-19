import { Component, Input } from '@angular/core';
import { IncidentService } from '../../service/incident.service';
import { Incident } from '../../models/incident';
import { Router } from '@angular/router';
import { FileHandle } from '../../models/file-handle';
import { DomSanitizer } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { NgToastService } from 'ng-angular-popup';
import Swal from 'sweetalert2';
import { User } from '../../models/user';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-create-incident',
  templateUrl: './create-incident.component.html',
  styleUrl: './create-incident.component.css',
})
export class CreateIncidentComponent {
  timeAnalyse: number = 0;
  incident: Incident = {
    incidentImages: [],
    id: 0,
    incidentType: '',
    date: new Date(),
    title: '',
    severityLevel: '',
    category: '',
    incidentID: '',
    ticketRaised: '',
    plantName: '',
    raisedBy: '',
    hostName: '',
    userName: '',
    hostStatus: '',
    investigation: '',
    roadCauseAnalysis: '',
    timeOfClosure: new Date(),
    remediation: '',
    firstEvent: new Date(),
    acknowledge: new Date(),
    timeAnalyse: 0,
    analyst: '',
    reviewer: '',
    remediationOwner: '',
    dateTarget: new Date(),
    escalation: '',
    incidentStatus: '',
    falsePositive: '',
    functionalEscalation: '',
    herarachicescalation: '',
    resolutionandrecovery: '',
    lessonLeraned: '',
    managementescalation: '',
  };
  users!: User[];
  @Input() isOpen: boolean = false;
  sidebarOpen: boolean = false;

  constructor(
    private incidentService: IncidentService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getAnalyst();
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  prepareFormData(incident: Incident): FormData {
    const formData = new FormData();
    formData.append(
      'incident',
      new Blob([JSON.stringify(incident)], { type: 'application/json' })
    );
    for (var i = 0; i < this.incident.incidentImages.length; i++) {
      formData.append(
        'imageFile',
        incident.incidentImages[i].file,
        incident.incidentImages[i].file.name
      );
    }

    return formData;
  }

  onFileSelected(event: any) {
    if (event.target.files) {
      const file = event.target.files[0];
      const fileHandle: FileHandle = {
        file: file,
        url: this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file)
        ),
      };
      // };
      this.incident.incidentImages.push(fileHandle);
    }
  }

  goToIncidentList() {
    this.router.navigate(['layout/incidentlogging']);
  }

  createIncident(incidentForm: NgForm) {
    if (incidentForm.invalid) {
      // Form is invalid, show alert or handle error message
      Swal.fire('Error!', 'All champs are obligatoire ', 'error');
      return;
    }
    const incidentFormData = this.prepareFormData(this.incident);
    this.incidentService.createIncident(incidentFormData).subscribe(
      (response: Incident) => {
        incidentForm.reset();
        this.incident.incidentImages = [];
        // Show success popup after creating incident
        Swal.fire('Success!', 'Incident added successfully.', 'success');

        this.goToIncidentList();
      },
      (error: HttpErrorResponse) => {
        console.error('Error creating incident:', error);
        Swal.fire('Error!', 'Failed to create incident.', 'error');
      }
    );
  }

  getAnalyst() {
    this.userService.getAnalyst().subscribe(
      (user) => {
        this.users = user;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  removeImages(i: number) {
    this.incident.incidentImages.splice(i, 1);
  }

  fileDropped(fileHandle: FileHandle) {
    this.incident.incidentImages.push(fileHandle);
  }
}
