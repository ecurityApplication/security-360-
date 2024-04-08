import { Component } from '@angular/core';
import { IncidentService } from '../../service/incident.service';
import { Incident } from '../../models/incident';
import { Router } from '@angular/router';
import { FileHandle } from '../../models/file-handle';
import { DomSanitizer } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { NgToastService } from 'ng-angular-popup';


@Component({
  selector: 'app-create-incident',
  templateUrl: './create-incident.component.html',
  styleUrl: './create-incident.component.css'
})
export class CreateIncidentComponent {
  constructor(private incidentService: IncidentService, private router:Router ,private sanitizer :DomSanitizer ,private toast: NgToastService 
    ){ }
  timeAnalyse: number = 0;
  // incident: Incident = new Incident();
  
  ngOnInit(): void {
  }

  incident:Incident ={
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
    remediation: '',
    firstEvent: '',
    acknowledge: '',
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
    managementescalation: ''
  }

  prepareFormData(incident: Incident): FormData {
    const formData = new FormData();
    formData.append(
      "incident",
      new Blob([JSON.stringify(incident)], { type: "application/json" })
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

// prepareFormData(incident: Incident): FormData {
//   const formData = new FormData();
//   formData.append("incident", JSON.stringify(incident));

//   for (const file of this.incident.incidentImages) {
//     formData.append('imageFile', file.file, file.file.name);
//   }

//   return formData;
// }

  onFileSelected(event: any) {
    if (event.target.files) {
      const file = event.target.files[0];
      const fileHandle: FileHandle = {
        file: file,
        url: this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file)
        ),}
      // };
      this.incident.incidentImages.push(fileHandle);
    }
  }
 
  // saveIncident(){

  //     this.incidentService.createIncident(this.incident).subscribe( data =>{console.log(data);
  //     this.goToIncidentList();
  //   },
  //   error => console.log(error));

  // }
  goToIncidentList(){
    this.router.navigate(['/incidentlogging']);
    // this.router.navigate(['/escalation']);
  }
  // onSubmit() {
  //   console.log(this.incident);
  //   this.saveIncident();
  // }
  // incrementTimeAnalyse() {
  //   this.incident.timeAnalyse += 5;
  // }



  createIncident(incidentForm: NgForm) {
    const incidentFormData=this.prepareFormData(this.incident);
    // if (this.incident.escalation === 'Yes') {
    //   this.router.navigate(['/incidentlogging']);
    //   this.router.navigate(['/escalation']);
    // } else {
    //   this.router.navigate(['/incidentlogging']);
    // }
    this.incidentService.createIncident(incidentFormData).subscribe(
      (response: Incident) => {

        incidentForm.reset();
        this.incident.incidentImages = [];
        this.showSuccess(); // Show success popup after creating incident


        this.goToIncidentList();


      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );


  }
  showSuccess() {
   
    this.toast.success({
      detail:"Success Message",
      summary:'Successful add new incident ',
      duration:3000,
       position:'topRight'})
  }

  
  
  
  removeImages(i: number) {
    this.incident.incidentImages.splice(i, 1);
  }
  
  fileDropped(fileHandle: FileHandle) {
    this.incident.incidentImages.push(fileHandle);
  }

}
