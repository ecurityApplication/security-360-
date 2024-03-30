import { Component, OnInit } from '@angular/core';
import { Incident } from '../../models/incident';
import { IncidentService } from '../../service/incident.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent implements OnInit {
  incidents: Incident[] = [];
  selectedDate: Date = new Date();

  constructor(private incidentService: IncidentService) { }

  ngOnInit(): void {
    this.getIncidentsByDate();
  }

  getIncidentsByDate(): void {
    this.incidentService.getIncidentByDate(this.selectedDate)
      .subscribe(
        (data: any) => {
          console.log(data);
          this.incidents = data;
        },
        error => {
          console.error(error);
        }
      )
  }

}
