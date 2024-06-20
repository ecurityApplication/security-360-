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
  averageTimeAnalyse!: number;
  customColors = ['rgb(240, 69, 69)', 'yellow', 'orange', ' rgb(231, 11, 11)', ' rgb(116, 210, 116)'];  averageMttr!: number;
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
    this.getIncidentsBySeverityLevel();
    this.getanalystPerIncident();
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
    //Number of alerts per plant highcharts
    plantChartOptions: Highcharts.Options = {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Number of alerts per plant'
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
    
    getIncidentCountByPlantNameAndMonth(): void {
      this.incidentService.getIncidentCountByPlantNameAndMonth().subscribe(data => {
        this.plantChartOptions.series = [
          {
            type: 'column',
            name: 'seriesName',
            data: Object.values(data),  
          }
        ];
        this.plantChartOptions.xAxis = {
          categories: Object.keys(data)
        };
        this.updateChartplant();
      });
    }
    
    updateChartplant(): void {
      this.Highcharts.chart('incident-count-by-plant-and-month-chart', this.plantChartOptions);
    }

//getEventsPerAnalyst
analysteChartOptions: Highcharts.Options = {
  chart: {
    type: 'column'
  },
  title: {
    text: 'Number of events per analyst'
  },
  xAxis: {
    type: 'category'
  },
  yAxis: {
    min: 0,
    title: {
      text: 'Analyst'
    }
  },
  series: [] as Highcharts.SeriesColumnOptions[]
};

getanalystPerIncident(): void {
  this.incidentService.getEventsPerAnalyst().subscribe(data => {
    this.analysteChartOptions.series = [
      {
        type: 'column',
        name: 'Number of events',
        data: Object.values(data),  
      }
    ];
    this.analysteChartOptions.xAxis = {
      categories: Object.keys(data)
    };
    this.updateChartanalyste();
  });
}

updateChartanalyste(): void {
  this.Highcharts.chart('incident-count-by-analyst', this.analysteChartOptions);
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
  this.incidentService.getIncidentsBySeverityLevelmonth().subscribe(data => {
    const formattedData = Object.entries(data).map(([key, value]) => ({
      name: key,
      y: value,
      severity: key.toLowerCase()
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
}
