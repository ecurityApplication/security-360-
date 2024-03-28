import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import {ActivatedRoute} from "@angular/router";
import { Incident } from '../../models/incident';
import { IncidentService } from '../../service/incident.service';



@Component({
  selector: 'app-incident-details',
  templateUrl: './incident-details.component.html',
  styleUrl: './incident-details.component.css'
})
export class IncidentDetailsComponent implements OnInit{
  id!: number
  incident!: Incident
  @ViewChild('contentToConvert') contentToConvert!: ElementRef;

  constructor(private  route:ActivatedRoute, private  incidentService:IncidentService) {
  }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.incident = new Incident();
    this.incidentService.getIncidentById(this.id).subscribe(data =>{
      console.log(data);
      this.incident = data;

    })
  }
    
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

}

