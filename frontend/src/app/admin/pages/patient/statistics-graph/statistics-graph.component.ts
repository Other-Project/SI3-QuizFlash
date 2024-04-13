import {AfterViewInit, Component, Input} from "@angular/core";
import Chart from 'chart.js/auto';
import {StatisticsService} from "../../../../../service/statistics.service";
import {GraphType} from "../../../../../models/graph-type.model";
import {QuestionType} from "../../../../../models/question-type.models";


@Component({
  selector: 'stats-graph',
  templateUrl: 'statistics-graph.component.html',
  styleUrls: ['statistics-graph.component.scss']
})

export class StatisticsGraphComponent implements AfterViewInit {
  protected readonly GraphType = GraphType;
  @Input() title: string = "";
  @Input() patientId?: string;

  protected dateAvailable: boolean = true;
  protected selectedQuizId?: string;
  private selectedQuestionType?: QuestionType;
  public chart?: Chart;
  selectedValue: GraphType = GraphType.TRIES;

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
          data: graphData[1].map(value => Math.round(value * 10) / 10)
        }]
      },
      options: {
        responsive: true,
        aspectRatio: 2.5,
        scales: {
          y: {
            suggestedMin: 0,
            suggestedMax: 100
          }
        }
      }
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      let data = this.statsService.getAllQuizzesGraphData(this.patientId!);
      this.createChart(data);
    })
  }

  selectedGraphType(graphType: GraphType, graphData?: [string[], number[]]) {
    if (!this.chart) return;
    if (graphType == GraphType.TRIES) {
      this.chart.options.scales!["y"]!.suggestedMax = 100;
      this.chart.data.datasets[0].label = "Taux de réussite";
    }
    else {
      this.chart.options.scales!["y"]!.suggestedMax = 15;
      this.chart.data.datasets[0].label = "Temps moyen par question";
    }
    this.updateChart(graphData ?? this.statsService.getQuizGraphData(this.patientId!, graphType, this.selectedQuizId!, this.selectedQuestionType));
  }

  updateChart(graphData: [string[], number[]]) {
    this.dateAvailable = graphData[0].length != 0;
    if (graphData[0].length == 0 || !this.chart) {
      return;
    }
    this.chart.data.labels = graphData[0];
    this.chart.data.datasets[0].data = graphData[1].map(value => Math.round(value * 10) / 10);
    this.chart.update();
  }

  quizSelection(quizId?: string, questionType?: QuestionType) {
    if (!this.patientId) return;
    this.selectedQuizId = quizId;
    this.selectedQuestionType = questionType;
    let chartData = quizId ?
      this.statsService.getQuizGraphData(this.patientId, GraphType.TRIES, quizId, questionType) :
      this.statsService.getAllQuizzesGraphData(this.patientId, questionType);
    this.selectedGraphType(GraphType.TRIES, chartData);
  }
}
