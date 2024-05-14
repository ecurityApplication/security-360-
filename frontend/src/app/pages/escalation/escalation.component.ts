import { Component, OnInit } from '@angular/core';
import { Incident } from '../../models/incident';
import { IncidentService } from '../../service/incident.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-escalation',
  templateUrl: './escalation.component.html',
  styleUrl: './escalation.component.css',
})
export class EscalationComponent implements OnInit{
  constructor(private incidentService :IncidentService ,private router :Router ){ }
  incident: Incident = new  Incident();


  incidents: Incident[] = [];
  ngOnInit(): void {
    this.getIncident()
  //   this.incidentService.getIncidentList().subscribe((data :Incident[] )=> {
  //    this.incidents = data;
  //  });
}
 getIncident(){
 this.incidentService.getEscalations().subscribe(data=>{
 // console.log(this.incidents);
   this.incidents = data;
   
 } , error => {
  console.error(error)
 })

}
// getIncident() {
//   if (this.incident.escalation === 'Yes') {
//     this.incidentService.getIncidentList().subscribe(data => {
//       console.log(this.incidents);
//       this.incidents = data;
//     }, error => {
//       console.error(error);
//     });
//   } else if (this.incident.escalation === 'No') {
//     // Do nothing or handle the case where escalation is 'No'
//     console.log('Escalation is set to "No". No data fetched.');
//   }
// }

updateescalation(id:number){
this.router.navigate(['/layout/update-escalation', id]);

}

// deleteIncident(id: number) {
//   this.incidentService.deleteIncident(id).subscribe(data => {
//     console.log(data);
//     this.getIncident();
//     this.incidentService.getIncidentList().subscribe((data: Incident[]) => {
//       this.incidents = data;
//     });
//   }}
  // getIncident() {
  //   this.incidentService.getIncidentList().subscribe(
  //     (data) => {
  //       this.incidents = data;
  //     },
  //     (error) => {
  //       console.error(error);
  //     }
  //   );
  // }
  // updateescalation(id: number) {
  //   this.router.navigate(['update-escalation', id]);
  // }


  //Delete Escalation
  deleteEscalation(id: number) {
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
  // incidentDetails(id: number) {
  // this.router.navigate(['incident-details', id]);
  // }

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
}
