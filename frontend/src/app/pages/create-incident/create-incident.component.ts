import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import {Incident} from "../../models/incident";
import {IncidentService} from "../../service/incident.service";

@Component({
  selector: 'app-create-incident',
  templateUrl: './create-incident.component.html',
  styleUrl: './create-incident.component.css'
})
export class CreateIncidentComponent implements OnInit  {
constructor(private incidentService: IncidentService, private router:Router){ }

incident: Incident = new Incident();
retrievedImage: any;
selectedFile: any;
message: any;
imageName: any;

getImage() {
}

onUpload() {
  console.log(this.selectedFile);
  const uploadImageData = new FormData();
  uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);


}
public onFileChanged(event:any) {
  this.selectedFile = event.target.files[0];

}
  // imgURL: any;
  // userFile: any  ;
  // public message!: string;
  // public imagePath:any;


  



  logSelectedIncidentType() {
  }

  ngOnInit(): void {
  }

  saveIncident(){

      this.incidentService.createIncident(this.incident).subscribe( data =>{console.log(data);
      this.goToIncidentList();
    },
    error => console.log(error));

  }
  goToIncidentList(){
    this.router.navigate(['/incidents']);
    this.router.navigate(['/escalation']);

  }
  onSubmit() {
    console.log(this.incident);
    this.saveIncident();
  }


  // onSelectFile(event:any) {
  //   if (event.target.files.length > 0)
  //   {
  //     const file = event.target.files[0];
  //     this.userFile = file;
  //    // this.f['profile'].setValue(file);
 
  //   var mimeType = event.target.files[0].type;
  //   if (mimeType.match(/image\/*/) == null) {
  //     this.message = "Only images are supported.";
  //     return;
  //   }
 
  //   var reader = new FileReader();
    
  //   this.imagePath = file;
  //   reader.readAsDataURL(file); 
  //   reader.onload = (_event) => { 
  //     this.imgURL = reader.result; 
  //   }
  // }
     
      
  //   }
    
  }

