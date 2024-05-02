import { Component } from '@angular/core';
import { IncidentService } from '../../service/incident.service';
import * as Highcharts from 'highcharts';
import { ChartDataset, ChartOptions } from 'chart.js';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-yearly-kpis',
  templateUrl: './yearly-kpis.component.html',
  styleUrl: './yearly-kpis.component.css',
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
  customColors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'];
  ticket = ['#0707f1', '#46a2ee'];
  falsePositiveRating!: number;
  constructor(private incidentService: IncidentService) {}

  ngOnInit() {
    this.NumberOfIncidentInCurrentYear();
    this.getTicketsRaisedInCurrentYear();
    this.getAverageTimeAnalyseCurrentYear();
    this.getIncidentPerMonth();
    this.getIncidentsBySeverityLevel();
    this.falsePositiveRatingYear();
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

  //FPR
  falsePositiveRatingYear() {
    this.incidentService.falsePositiveRatingOfCurrentYear().subscribe(
      (data) => {
        this.falsePositiveRating = data;
      },
      (error) => {
        console.error('Error fetching average FPR:', error);
      }
    );
  }
  //Number of incident
  NumberOfIncidentInCurrentYear() {
    this.incidentService
      .numberOfIncidentCountForCurrentYear()
      .subscribe((count) => {
        this.incidentCount = count;
      });
  }

  //Ticket raised per year
  getTicketsRaisedInCurrentYear() {
    this.incidentService.getTicketsRaisedInCurrentYear().subscribe((data) => {
      this.createTicketsRaisedPerYearChart(data);
    });
  }
  createTicketsRaisedPerYearChart(
    data: { year: string; ticketsRaisedYes: number; ticketsRaisedNo: number }[]
  ) {
    this.ticketsRaisedPerYearChartOptions = {
      chart: {
        type: 'column',
      },
      title: {
        text: 'Ticket Raised/Incidents',
      },
      xAxis: {
        categories: data.map((item) => item.year),
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Tickets Raised',
        },
      },
      series: [
        {
          type: 'column',
          name: 'Tickets Raised Yes',
          data: data.map((item) => item.ticketsRaisedYes),
        },
        {
          type: 'column',
          name: 'Tickets Raised No',
          data: data.map((item) => item.ticketsRaisedNo),
        },
      ],
      colors: this.ticket,
    };

    Highcharts.chart(
      'tickets-raised-per-year-chart',
      this.ticketsRaisedPerYearChartOptions
    );
  }
  // Number of treated incidents by severity-year
  SeverityLevelChartOptions: Highcharts.Options = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Number of treated incidents by severity',
    },
    xAxis: {
      type: 'category',
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Count',
      },
    },
    series: [] as Highcharts.SeriesColumnOptions[],
    colors: this.customColors, // Set custom colors here
  };

  getIncidentsBySeverityLevel(): void {
    this.incidentService.getIncidentsBySeverityLevelyear().subscribe((data) => {
      const formattedData = Object.entries(data).map(([key, value]) => ({
        name: key,
        y: value,
      }));
      this.SeverityLevelChartOptions.series = [
        {
          type: 'pie',
          name: 'Severity',
          data: formattedData,
        },
      ];
      this.SeverityLevelChartOptions.xAxis = {
        categories: formattedData.map((item) => item.name),
      };
      this.updateChartpie();
    });
  }

  updateChartpie(): void {
    this.Highcharts.chart(
      'incident-chart-severity',
      this.SeverityLevelChartOptions
    );
  }

  //chart of incidents per month of the current year chart
  getIncidentPerMonth(): void {
    this.incidentService.getIncidentsPerMonthCurrentYear().subscribe((data) => {
      const months = Object.keys(data);
      const counts = Object.values(data);

      this.lineChart = new Chart('lineChart', {
        type: 'line',
        data: {
          labels: months,
          datasets: [
            {
              label: 'Incident Count',
              data: counts,
              borderColor: 'blue',
              fill: false,
            },
          ],
        },
        options: {
          scales: {
            x: {
              display: true,
              title: {
                display: true,
                text: 'Months',
              },
            },
          },
        },
      });
    });
  }
}
