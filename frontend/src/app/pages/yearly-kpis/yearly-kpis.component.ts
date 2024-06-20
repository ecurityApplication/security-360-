import { Component } from '@angular/core';
import { IncidentService } from '../../service/incident.service';
import * as Highcharts from 'highcharts';
import { ChartDataset, ChartOptions } from 'chart.js';
import { Chart } from 'chart.js';
import { HttpErrorResponse } from '@angular/common/http';


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
  MTTAMedium!: number;
  MTTAhighcritical!: number;
  MTTAlowinformationel!: number;
  MTTDMedium!: string;
  MTTDhighcritical!: string;
  MTTDlowinformationel!: string;
  MTTRMedium!: string;
  MTTRhighcritical!: string;
  MTTRlowinformationel!: string;
  lineChart: any;
  customColors = ['rgb(240, 69, 69)', 'yellow', 'orange', ' rgb(231, 11, 11)', ' rgb(116, 210, 116)'];
     falsePositiveRating!: number;
  ticket = ['#0707f1', '#46a2ee'];
  constructor(private incidentService: IncidentService) {}

  ngOnInit() {
    this.NumberOfIncidentInCurrentYear();
    this.getTicketsRaisedInCurrentYear();
    // this.getAverageTimeAnalyseCurrentYear();
    this.getIncidentPerMonth();
    this.getIncidentsBySeverityLevel();
    this.falsePositiveRatingYear();
    this.getanalystPerIncident();
    this.getMTTAMedium();
    this.getMTTAhighcritical();
    this.getMTTAlowinformationel();
    this.getMTTDMedium();
    this.getMTTDhighcritical();
    this.getMTTDlowinformationel();
    this.getMTTRMedium();
    this.getMTTRhighcritical();
    this.getMTTRlowinformationel();

    


  }

  //MTTA
  // getAverageTimeAnalyseCurrentYear() {
  //   this.incidentService.getAverageTimeAnalyseCurrentYear().subscribe(
  //     (data) => {
  //       this.averageTimeAnalyse = data;
    
  //     },
  //     (error) => {
  //       console.error('Error fetching average time analyse:', error);
  //     }
  //   );
  // }
      //MTTA year Medium
      getMTTAMedium() {
        this.incidentService.getMTTAYearMedium().subscribe(
          (data) => {
            this.MTTAMedium = data;
        
          },
          (error) => {
            console.error('Error fetching MTTAMedium:', error);
          }
        );
      }
      //MTTA year high-critical
      getMTTAhighcritical() {
        this.incidentService.getMTTAYearhighcritical().subscribe(
          (data) => {
            this.MTTAhighcritical= data;
        
          },
          (error) => {
            console.error('Error fetching MTTA high-critical:', error);
          }
        );
      }
       //MTTA year low-informationel
       getMTTAlowinformationel() {
        this.incidentService.getMTTAYearlowinformational().subscribe(
          (data) => {
            this.MTTAlowinformationel= data;
        
          },
          (error) => {
            console.error('Error fetching MTTA  low-informationel:', error);
          }
        );
      }
       //MTTDyear Medium
       getMTTDMedium() {
        this.incidentService.getMTTDYearMedium().subscribe(
          (data) => {
            this.MTTDMedium = data;
        
          },
          (error) => {
            console.error('Error fetching MTTD Medium:', error);
          }
        );
      }
   
      //MTTD year high-critical
      getMTTDhighcritical() {
        this.incidentService.getMTTDYearhighcritical().subscribe(
          (data) => {
            this.MTTDhighcritical= data;
        
          },
          (error) => {
            console.error('Error fetching MTTA high-critical:', error);
          }
        );
      }
       //MTTD year low-informationel
       getMTTDlowinformationel() {
        this.incidentService.getMTTDYearlowinformational().subscribe(
          (data) => {
            this.MTTDlowinformationel= data;
        
          },
          (error) => {
            console.error('Error fetching MTTA  low-informationel:', error);
          }
        );
      }
       //MTTRyear Medium
       getMTTRMedium() {
        this.incidentService.getMTTRYearMedium().subscribe(
          (data) => {
            this.MTTRMedium = data;
        
          },
          (error) => {
            console.error('Error fetching MTTD Medium:', error);
          }
        );
      }
   
      //MTTR year high-critical
      getMTTRhighcritical() {
        this.incidentService.getMTTRYearhighcritical().subscribe(
          (data) => {
            this.MTTRhighcritical= data;
        
          },
          (error) => {
            console.error('Error fetching MTTA high-critical:', error);
          }
        );
      }
       //MTTR year low-informationel
       getMTTRlowinformationel() {
        this.incidentService.getMTTRYearlowinformational().subscribe(
          (data) => {
            this.MTTRlowinformationel= data;
        
          },
          (error) => {
            console.error('Error fetching MTTA  low-informationel:', error);
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
//getEventsPerAnalyst yearly
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
      text: 'Count'
    }
  },
  series: [] as Highcharts.SeriesColumnOptions[]
};
getanalystPerIncident(): void {
  this.incidentService.getEventsPerAnalystYearly().subscribe(data => {
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
