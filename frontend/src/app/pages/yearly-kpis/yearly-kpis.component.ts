  import { Component } from '@angular/core';
  import { IncidentService } from '../../service/incident.service';
  import * as Highcharts from 'highcharts';
  import { ChartDataset, ChartOptions } from 'chart.js';
  import { Chart } from 'chart.js';

  @Component({
    selector: 'app-yearly-kpis',
    templateUrl: './yearly-kpis.component.html',
    styleUrl: './yearly-kpis.component.css'
  })
  export class YearlyKpisComponent {
    Highcharts: typeof Highcharts = Highcharts;
    ticketsRaisedPerYearChartOptions!: Highcharts.Options;
    incidentCount!: number;
    incidentCountByMonth!: Map<number, number>;
    chartData!: ChartDataset[];
    chartOptions!: ChartOptions;
    averageTimeAnalyse!: number;
    lineChart: any;
    constructor(private incidentService: IncidentService) {}

    ngOnInit() {
      this.NumberOfIncidentInCurrentYear();
      this.getTicketsRaisedInCurrentYear();
      this.getAverageTimeAnalyseCurrentYear()
     this.getIncidentPerMonth()
    }

  //MTTA
  getAverageTimeAnalyseCurrentYear() {
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

//Number of incident
  NumberOfIncidentInCurrentYear() {
    this.incidentService.numberOfIncidentCountForCurrentYear().subscribe(count => {
      this.incidentCount = count;
    });
  }

//Ticket raised per year
getTicketsRaisedInCurrentYear() {
  this.incidentService.getTicketsRaisedInCurrentYear().subscribe((data) => {
    this.createTicketsRaisedPerYearChart(data);
  });

}
  createTicketsRaisedPerYearChart(data: { year: string; ticketsRaisedYes: number; ticketsRaisedNo: number }[]) {
    this.ticketsRaisedPerYearChartOptions = {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Ticket Raised/Incidents'
      },
      xAxis: {
        categories: data.map((item) => item.year)
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Tickets Raised'
        }
      },
      series: [
        {
          type: 'column',
          name: 'Tickets Raised Yes',
          data: data.map((item) => item.ticketsRaisedYes)
        },
        {
          type: 'column',
          name: 'Tickets Raised No',
          data: data.map((item) => item.ticketsRaisedNo)
        }
      ]
    };

    Highcharts.chart('tickets-raised-per-year-chart', this.ticketsRaisedPerYearChartOptions);
  }

  
  //chart of incidents per month of the current year chart
    getIncidentPerMonth(): void {
      this.incidentService.getIncidentsPerMonthCurrentYear().subscribe(data => {
        const months = Object.keys(data);
        const counts = Object.values(data);
  
        this.lineChart = new Chart('lineChart', {
          type: 'line',
          data: {
            labels: months,
            datasets: [{
              label: 'Incident Count',
              data: counts,
              borderColor: 'blue',
              fill: false
            }]
          },
          options: {
            scales: {
              x: {
                display: true,
                title: {
                  display: true,
                  text: 'Months'
                }
              }
            }
          }
        });
      });
    }
  }

