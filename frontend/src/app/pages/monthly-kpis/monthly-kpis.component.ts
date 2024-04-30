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
  incidentCount!: any[];
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions!: Highcharts.Options;
  incidentCountByPlantAndMonthChartOptions!: Highcharts.Options;
  ticketsRaisedPerMonthChartOptions!: Highcharts.Options;
  averageTimeAnalyse!: number;
  customColors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'];


  constructor(private incidentService: IncidentService) { }

  ngOnInit() {
   this.getIncidentCount();
    // this.getEventsPerAnalyst();
    this.getIncidentCountByPlantNameAndMonth();
    this.getTicketRaisedPerIncident();
    this.getAverageTimeAnalyseCurrentMonth();
      this.getIncidentsBySeverityLevel();
    
    
  }


  //Number of Incidents This month 
  getIncidentCount() {
    this.incidentService.getCurrentMonthIncidentCounts().subscribe(
      (data) => {
        this.incidentCount = data;
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
  //Number of events per analyst method call
  // getEventsPerAnalyst() {
  //   this.incidentService.getEventsPerAnalyst().subscribe((data) => {
  //     this.initializeChart(data);
  //   });
  // }
  //Number of events per analyst highcharts
  // initializeChart(data: { [key: string]: number }) {
  //   this.chartOptions = {
  //     chart: {
  //       type: 'column',
  //     },
  //     title: {
  //       text: 'Number of events per analyst',
  //     },
  //     xAxis: {
  //       categories: Object.keys(data).sort(),
  //       title: {
  //         text: 'Analyst',
  //       },
  //     },
  //     yAxis: {
  //       min: 0,
  //       title: {
  //         text: 'Events',
  //       },
  //     },
  //     series: [
  //       {
  //         type: 'column',
  //         // name: 'Events',
  //         data: Object.values(data),
  //         color: '#0077b6',
  //       },
  //     ],
  //   };

  //   (Highcharts as any).chart('incident-chart', this.chartOptions);
  // }

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
      text: 'Ticket Raised Per Incident'
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










  // pieChartOptions: ChartOptions = {
  //   responsive: true,
  //   maintainAspectRatio: false
  // };
  // chartType: ChartType = 'pie';
  // chartData: ChartData<'pie'> = {
  //   labels: [],
  //   datasets: []
  // };

 

  // getIncidentsBySeverityLevel() {
  //   this.incidentService.getIncidentsBySeverityLevel().subscribe(data => {
  //     this.chartData.labels = data.map(item => item[0].toString());
  //     this.chartData.datasets = [
  //       {
  //         data: data.map(item => item[1]),
  //         backgroundColor: this.getRandomColors(data.length)
  //       }
  //     ];
  //   });
  // }

  // private getRandomColors(count: number): string[] {
  //   const colors = [];
  //   for (let i = 0; i < count; i++) {
  //     const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
  //     colors.push(randomColor);
  //   }
  //   return colors;
  // }
}
