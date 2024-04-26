import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Incident } from '../../models/incident';
import { ActivatedRoute, Router } from '@angular/router';
import { IncidentService } from '../../service/incident.service';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';
import { asBlob } from 'html-docx-js-typescript';
import { saveAs } from 'file-saver';


@Component({
  selector: 'app-show-dialog',
  templateUrl: './show-dialog.component.html',
  styleUrl: './show-dialog.component.css'
})
export class ShowDialogComponent implements OnInit {
  id!: number

  incident: Incident = new Incident();
  @ViewChild('contentToConvert') contentToConvert!: ElementRef;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any ,
    private router: Router,
    private route: ActivatedRoute,
    private incidentService: IncidentService
  ) {}


  ngOnInit(): void {
    // if (this.data && this.data.incidentId) {
    //   this.loadIncidentDetails(this.data.incidentId);
    // }

    // this.receiveImages();
  }
  // loadIncidentDetails(id: number) {
  //   this.incidentService.getIncidentById(id).subscribe(data => {
  //     this.incident = data;
  //   });
  // }
  
  // receiveImages() {
  //   console.log(this.data);
  // }
  public convertToPDF() {
    if (!this.contentToConvert) {
      console.error('Content element not found.');
      return;
    }

    const data = this.contentToConvert.nativeElement;
    html2canvas(data).then(canvas => {
      // Options de dimensionnement de l'image dans le PDF
      const imgWidth = 210;
      const imgHeight = canvas.height * imgWidth / canvas.width;

      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jspdf('p', 'mm', 'a4'); // Taille A4 pour le PDF
      let position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      
      pdf.save('new-file.pdf'); // Télécharger le PDF généré
    });


}
public convertToWord() {
  if (!this.contentToConvert) {
    console.error('Content element not found.');
    return;
  }

  const contentElement = this.contentToConvert.nativeElement;
  const htmlContent = contentElement.innerHTML;

  asBlob(htmlContent).then((blobOrBuffer: Blob | Buffer) => { // Adjust parameter type to Blob | Buffer
    if (blobOrBuffer instanceof Blob) {
      saveAs(blobOrBuffer, 'new-file.docx'); // Download the generated Word file
    } else {
      console.error('Error generating Word file: Invalid blob type.');
    }
  }).catch(error => {
    console.error('Error generating Word file:', error);
  });
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
}
