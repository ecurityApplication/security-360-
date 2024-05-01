import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { IncidentService } from '../../service/incident.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  chartRef:| undefined; // Explicitly declare type
  oneToOne = true;
  updateFlag = true; // Explicitly declare type
  constructor(private incidentservice: IncidentService) {}

  chartOptions: Highcharts.Options = {
    xAxis: {
    type: 'category'
  },
  title: {
    text: 'Number of incident per type'
},
  series: [
    {
      name: 'Category',
      type: 'line'
    }
  ]
};
secondChartOptions: Highcharts.Options = {
  xAxis: {
  type: 'category'
},


title: {
  text: 'Number of alerts per source'
},
series: [
  {
    name: 'RaisedBy',
    type: 'line'
  }
]
};

  ngOnInit(): void {
    this.getCaregory();
    this.getRaisedby();
  }

  getCaregory(): void {
    this.incidentservice.getIncidentCountsByCategory().subscribe((data) => {
      const chartData = [];
      for (let key in data) {
        chartData.push([key, data[key]]);
      }
      this.chartOptions.series = [
        {
          type: 'column',
          data: chartData,
        },
      ];
      this.updateFlag = true;
    });
  }
  getRaisedby(): void {
    this.incidentservice.getIncidentCountsByraisedby().subscribe((data) => {
      const charte = [];
      for (let key in data) {
        charte.push([key, data[key]]);
      }
      this.secondChartOptions.series = [
        {
          type: 'column',
          data: charte,
        },
      ];
          this.updateFlag = true;
    });
  }
}
