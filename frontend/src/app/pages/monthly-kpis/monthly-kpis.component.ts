import { Component, OnInit } from '@angular/core';
import { IncidentService } from '../../service/incident.service';
import * as Highcharts from 'highcharts';
import { ChartOptions, ChartType, ChartData } from 'chart.js';
@Component({
  selector: 'app-monthly-kpis',
  templateUrl: './monthly-kpis.component.html',
  styleUrl: './monthly-kpis.component.css',
})
export class MonthlyKPIsComponent implements OnInit {
  incidentsCount!: number;
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions!: Highcharts.Options;
  incidentCountByPlantAndMonthChartOptions!: Highcharts.Options;
  ticketsRaisedPerMonthChartOptions!: Highcharts.Options;
  averageTimeAnalyse!: number;
  averageMttr!: number;
  
  constructor(private incidentService: IncidentService) { }

  ngOnInit() {
   this.getIncidentCount();
    this.getIncidentCountByPlantNameAndMonth();
    this.getTicketRaisedPerIncident();
    this.getAverageTimeAnalyseCurrentMonth(); 
    this.getAverageMttr();
  }

  //Number of Incidents This month 
  getIncidentCount() {
    this.incidentService.getCurrentMonthIncidentCounts().subscribe(
      (data) => {
        this.incidentsCount = data;
      },
      (error) => {
        console.error('Error fetching incident count:', error);
      }
    );
  }

//MTTA
getAverageTimeAnalyseCurrentMonth() {
  this.incidentService.getAverageTimeAnalyseCurrentMonth().subscribe(
    (data) => {
      this.averageTimeAnalyse = data;
      console.log(data);
      
    },
    (error) => {
      console.error('Error fetching average time analyse:', error);
    }
  );
}
  //MTTR
  getAverageMttr() {
    this.incidentService.getAverageMttr().subscribe(
      (data) => {
        this.averageMttr = data;
      },
      (error) => {
        console.error('Error fetching average MTTR:', error);
      }
    );
  }
  //Number of alerts per plant method call
  getIncidentCountByPlantNameAndMonth() {
    this.incidentService
      .getIncidentCountByPlantNameAndMonth()
      .subscribe((data) => {
        this.createIncidentCountByPlantAndMonthChart(data);
      });
  }
  //Number of alerts per plant highcharts
  createIncidentCountByPlantAndMonthChart(data: {
    [key: string]: { [key: string]: number };
  }) {
    this.incidentCountByPlantAndMonthChartOptions =
      this.createHighchartsOptions(
        'Number of alerts per plant',
        Object.keys(data).sort(),
        'Incident Count',
        Object.values(data).flatMap((plantData) =>
          Object.values(plantData).sort()
        )
      );
    this.renderHighchartsChart(
      'incident-count-by-plant-and-month-chart',
      this.incidentCountByPlantAndMonthChartOptions
    );
  }

  createHighchartsOptions(
    title: string,
    categories: string[],
    seriesName: string,
    data: number[]
  ): Highcharts.Options {
    return {
      chart: {
        type: 'column',
      },
      title: {
        text: title,
      },
      xAxis: {
        categories: categories,
      },
      yAxis: {
        min: 0,
        title: {
          text: seriesName,
        },
      },
      series: [
        {
          type: 'column',
          name: seriesName,
          data: data,
          color: '#0077b6',
        },
      ],
    };
  }

  renderHighchartsChart(containerId: string, chartOptions: Highcharts.Options) {
    (Highcharts as any).chart(containerId, chartOptions);
  }

  //Tickets raised/incidents
  ticketRaisedChartOptions: Highcharts.Options = {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Ticket Raised/Incidents'
    },
    xAxis: {
      type: 'category'
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Count'
      }
    },
    series: [] as Highcharts.SeriesColumnOptions[]
  };

  getTicketRaisedPerIncident(): void {
    this.incidentService.getTicketRaisedPerIncident().subscribe(data => {
      this.ticketRaisedChartOptions.series = [
        {
          type: 'column',
          name: 'Ticket Raised',
          data: Object.values(data),  
        }
      ];
      this.ticketRaisedChartOptions.xAxis = {
        categories: Object.keys(data)
      };
      this.updateChart();
    });
  }

  updateChart(): void {
    this.Highcharts.chart('incident-chart-ticket-raised', this.ticketRaisedChartOptions);
  }

//Number of treated incidents by severity









}
