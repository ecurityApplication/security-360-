import { Component, Inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IncidentService } from '../../service/incident.service';
import { Incident } from '../../models/incident';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ShowDialogComponent } from '../show-dialog/show-dialog.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ImageProcessingService } from '../../image-processing.service';
import { map } from 'rxjs/operators';

import Swal from 'sweetalert2';
import { CreateIncidentComponent } from '../create-incident/create-incident.component';

@Component({
  selector: 'app-incident-logging',
  templateUrl: './incident-logging.component.html',
  styleUrl: './incident-logging.component.css',
})
export class IncidentLoggingComponent implements OnInit {
  incidents: Incident[] = [];

  constructor(
    private incidentService: IncidentService,
    private router: Router,
    public imagesDialog: MatDialog,
    private imageProcessingService: ImageProcessingService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getIncident();
  }
  searchByKeyword(searchkeyword: string) {
    console.log(searchkeyword);
    this.getIncident(searchkeyword);
  }
  public getIncident(searchKey: string = '') {
    this.incidentService
      .getIncidentList(searchKey)
      .pipe(
        map((x: Incident[], i) =>
          x.map((incident: Incident) =>
            this.imageProcessingService.createImages(incident)
          )
        )
      )

      .subscribe(
        (resp: Incident[]) => {
          //console.log(resp);
          this.incidents = resp;
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
  }

  updateIncident(id: number) {
    this.router.navigate(['/layout/update-incident', id]);
  }
  //Delete Incidents
  deleteIncident(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        // Call the deleteIncident method when the user confirms
        this.incidentService.deleteIncident(id).subscribe(
          () => {
            // Show success message
            Swal.fire({
              title: 'Deleted!',
              text: 'Your incident has been deleted.',
              icon: 'success',
            });
            // Refresh user data after deletion
            this.getIncident();
          },
          (error) => {
            // Handle error if deletion fails
            console.error('Error deleting incident:', error);
            Swal.fire({
              title: 'Error',
              text: 'Failed to delete incident.',
              icon: 'error',
            });
          }
        );
      }
    });
  }

  //navigate to the raport
  incidentDetails(id: number) {
    this.router.navigate(['incident-details', id]);
  }

  //incident id + date
  // Method to generate incident ID
  generateIncidentID(index: number): string {
    const today = new Date();
    const dateString = this.getDateString(today);
    const incidentID = index + 1; // Adding 1 to index to start from 1
    return dateString + '-' + incidentID.toString().padStart(2, '0'); // Pad the incident ID with zeros
  }

  // Method to get date string in the format YYYYMMDD
  getDateString(date: Date): string {
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-indexed
    const day = date.getDate().toString().padStart(2, '0');
    return year + '/' + month + '/' + day;
  }

  getSeverityClass(severityLevel: string): string {
    switch (severityLevel) {
      case 'Informational':
        return 'green-bg';
      case 'Low':
        return 'yellow-bg';
      case 'Medium':
        return 'orange-bg';
      case 'High':
        return 'red-bg';
      case 'Critical':
        return 'redred-bg';
      default:
        return '';
    }
  }

  gettypeClass(incidentType: string): string {
    switch (incidentType) {
      case 'Major incident':
        return 'green-bg';
      case 'Minor Incident':
        return 'red-bg';

      default:
        return '';
    }
  }

  getStatusClass(incidentStatus: string): string {
    switch (incidentStatus) {
      case 'Open':
        return 'green-bg';
      case 'Closed':
        return 'orange-bg';

      default:
        return '';
    }
  }
  getHostClass(hostStatus: string): string {
    switch (hostStatus) {
      case 'Contained':
        return 'red-bg';
      case 'NOT-Contained':
        return 'green-bg';

      default:
        return '';
    }
  }
  showImages(incident: Incident) {
    console.log(incident);
    this.imagesDialog.open(ShowDialogComponent, {
      data: {
        images: incident.incidentImages,
        title: incident.title,
        date: incident.date,
        severity: incident.severityLevel,
        plantName: incident.plantName,
        hostName: incident.hostName,
        category: incident.category,
        raisedBy: incident.raisedBy,
        userName: incident.userName,
        incidentid: incident.incidentID,
        incidentStatus: incident.incidentStatus,
        ticketRaised: incident.ticketRaised,
        hostStatus: incident.hostStatus,
        investigation: incident.investigation,
        remediation: incident.remediation,
        remediationOwner: incident.remediationOwner,
        dateTarget: incident.dateTarget,
        firstEvent: incident.firstEvent,
        acknowledge: incident.acknowledge,
        timeAnalyse: incident.timeAnalyse,
        timeOfClosure:incident.timeOfClosure,
        analyst: incident.analyst,
        reviewer: incident.reviewer,
      },
      height: '1500px',
      width: '800px',
    });
  }
}
