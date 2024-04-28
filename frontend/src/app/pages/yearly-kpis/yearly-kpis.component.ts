import { Component } from '@angular/core';
import { IncidentService } from '../../service/incident.service';
import * as Highcharts from 'highcharts';
import { ChartDataset, ChartOptions } from 'chart.js';
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
  constructor(private incidentService: IncidentService) {}

  ngOnInit() {
    this.NumberOfIncidentInCurrentYear();
    this.getTicketsRaisedInCurrentYear();
    this.get();
  }

  getTicketsRaisedInCurrentYear() {
    this.incidentService.getTicketsRaisedInCurrentYear().subscribe((data) => {
      this.createTicketsRaisedPerYearChart(data);
    });

  }
  NumberOfIncidentInCurrentYear() {
    this.incidentService.getIncidentCountForCurrentYear().subscribe(count => {
      this.incidentCount = count;
      // Use the incidentCount to update your line chart
    });
  }

  createTicketsRaisedPerYearChart(data: { year: string; ticketsRaisedYes: number; ticketsRaisedNo: number }[]) {
    this.ticketsRaisedPerYearChartOptions = {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Tickets Raised in Current Year'
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

  get() {
    this.incidentService.getIncidentCountByMonthForCurrentYear().subscribe(data => {
      this.incidentCountByMonth = data;
      this.initializeChart();
    });
  }

  initializeChart() {
    this.chartData = [
      {
        label: 'Incidents',
        data: Array.from(this.incidentCountByMonth.values()),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ];

    this.chartOptions = {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Incidents for Current Year'
        }
      },
      scales: {
        x: {
          type: 'category',
          labels: Array.from(this.incidentCountByMonth.keys()).map(month => this.getMonthName(month))
        },
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Number of Incidents'
          }
        }
      }
    };
  }

  getMonthName(month: number): string {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                       'July', 'August', 'September', 'October', 'November', 'December'];
    return monthNames[month - 1];
  }
}
