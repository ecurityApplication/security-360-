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
    customColors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'];

    constructor(private incidentService: IncidentService) {}

    ngOnInit() {
      this.NumberOfIncidentInCurrentYear();
      this.getTicketsRaisedInCurrentYear();
      this.getAverageTimeAnalyseCurrentYear()
      this.createChart();
      this.getIncidentsPerMonth();
      this.createChart();
      this.getIncidentsBySeverityLevel();

    }

  getTicketsRaisedInCurrentYear() {
    this.incidentService.getTicketsRaisedInCurrentYear().subscribe((data) => {
      this.createTicketsRaisedPerYearChart(data);
    });

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
  // Number of treated incidents by severity
SeverityLevelChartOptions: Highcharts.Options = {
  chart: {
    type: 'pie'
  },
  title: {
    text: 'Number of treated incidents by severity'
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
  series: [] as Highcharts.SeriesColumnOptions[],
  colors: this.customColors // Set custom colors here
};

getIncidentsBySeverityLevel(): void {
  this.incidentService.getIncidentsBySeverityLevelyear().subscribe(data => {
    const formattedData = Object.entries(data).map(([key, value]) => ({
      name: key,
      y: value
    }));
    this.SeverityLevelChartOptions.series = [
      {
        type: 'pie',
        name: 'Severity',
        data: formattedData,
      }
    ];
    this.SeverityLevelChartOptions.xAxis = {
      categories: formattedData.map(item => item.name)
    };
    this.updateChartpie();
  });
}

updateChartpie(): void {
  this.Highcharts.chart('incident-chart-severity', this.SeverityLevelChartOptions);
}

  
  //Number of incidents per month of the current year
  chart: any;
  incidentsPerMonth!: any[];

  getIncidentsPerMonth() {
    this.incidentService.getIncidentsPerMonth() // Replace with your actual base URL
      .subscribe(
        (data) => {
          this.incidentsPerMonth = data;
          this.createChart();
        },
        (error) => {
          console.error('Error fetching incidents per month:', error);
        }
      );
  }

  createChart() {
    if (this.incidentsPerMonth && this.incidentsPerMonth.length > 0) {
      const labels = this.incidentsPerMonth.map(item => this.getMonthName(item.month));
      const data = this.incidentsPerMonth.map(item => item.totalIncidents);
      console.log(data, "line");

      if (this.chart) {
        this.chart.data.labels = labels;
        this.chart.data.datasets[0].data = data;
        this.chart.update();
      } else {
        this.chart = new Chart("MyChart", {
          type: 'line',
          data: {
            labels: labels,
            datasets: [{
              label: 'Total Incidents',
              data: data,
              borderColor: 'blue',
              fill: false
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false
          }
        });
      }
    }
  }

  getMonthName(monthNumber: number): string {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];
    return monthNames[monthNumber - 1];
  }
}
