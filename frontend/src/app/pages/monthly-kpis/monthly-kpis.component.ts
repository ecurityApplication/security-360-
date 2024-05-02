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
  customColors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'];
  averageMttr!: number;
  falsePositiveRating!: number;
  ticket = ['#0707f1', '#46a2ee'];

  constructor(private incidentService: IncidentService) {}

  ngOnInit() {
    this.getIncidentCount();
    this.getIncidentCountByPlantNameAndMonth();
    this.ticketsRaisedInCurrentMonth();
    this.getAverageTimeAnalyseCurrentMonth();
    this.getAverageMttr();
    this.falsePositiveRatingMonth();
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
        console.log("mttr",data);
        
        this.averageMttr = data;
      },
      (error) => {
        console.error('Error fetching average MTTR:', error);
      }
    );
  }

  //FPR
  falsePositiveRatingMonth() {
    this.incidentService.falsePositiveRatingOfCurrentMonth().subscribe(
      (data) => {
        this.falsePositiveRating = data;
      },
      (error) => {
        console.error('Error fetching average FPR:', error);
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
        'Alert',
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
        title: {
          text: 'Plant Name',
        },
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
          color: 'blue',
        },
      ],
    };
  }

  renderHighchartsChart(containerId: string, chartOptions: Highcharts.Options) {
    (Highcharts as any).chart(containerId, chartOptions);
  }

  //Tickets raised/incidents
  ticketchartOptions: any;

  ticketsRaisedInCurrentMonth() {
    this.incidentService
      .getTicketsRaisedInCurrentMonth()
      .subscribe((data: any) => {
        this.ticketchartOptions = {
          chart: {
            type: 'column',
          },
          title: {
            text: 'Tickets Raised in Current Month',
          },
          xAxis: {
            categories: data.map((item: any) => item.yearMonth),
          },
          yAxis: {
            title: {
              text: 'Number of Tickets',
            },
          },
          series: [
            {
              name: 'Tickets Raised (Yes)',
              data: data.map((item: any) => item.ticketsRaisedYes),
              color: '#0707f1',
            },
            {
              name: 'Tickets Raised (No)',
              data: data.map((item: any) => item.ticketsRaisedNo),
              color: '#46a2ee',
            },
          ],
        };
        Highcharts.chart('chartContainer', this.ticketchartOptions);
      });
  }

  //Number of treated incidents by severity-month
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
    this.incidentService
      .getIncidentsBySeverityLevelmonth()
      .subscribe((data) => {
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
}
