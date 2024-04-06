import {Component, Input, OnInit} from "@angular/core";
import Chart from 'chart.js/auto';
import {StatisticsService} from "../../../../../service/statistics.service";
import {Observable, Subscription} from "rxjs";


@Component({
  selector: 'stats-graph',
  templateUrl: 'statistics-graph.component.html',
  styleUrls: ['statistics-graph.component.scss']
})

export class StatisticsGraphComponent implements OnInit {
  @Input() quizSelectionEvent?: Observable<{ quizId: string, questionType: string }>;
  @Input() title: string = "";
  @Input() patientId?: string;

  private eventSubscription?: Subscription;
  public chart: any;

  constructor(private statsService: StatisticsService) {
  }

  createChart(graphData: [string[], number[]]) {
    this.chart = new Chart("stat-chart", {
      type: 'line',
      data: {
        labels: graphData[0],
        datasets: [{
          label: 'Taux de réussite',
          backgroundColor: "rgba(0,0,255,1.0)",
          borderColor: "rgba(0,0,255,0.1)",
          data: graphData[1]
        }]
      },
      options: {
        responsive: true,
        aspectRatio: 2.5
      }
    });
  }

  ngOnInit(): void {
    this.eventSubscription = this.quizSelectionEvent?.subscribe((quizId) => this.quizSelection(quizId));
    this.createChart(this.statsService.getAllQuizzesGraphData(this.patientId!, undefined));
  }

  selectedGraphType(selectedMode: string) {
    console.log(selectedMode);
  }

  quizSelection(quizSelectionData: { quizId: string, questionType: string }) {
    console.log("RECU", quizSelectionData);
  }
}
