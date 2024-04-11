import {AfterViewInit, Component, ElementRef, Input, ViewChild} from "@angular/core";
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

  @ViewChild("statsContainer") statsContainer?: ElementRef;

  protected selectedQuizId?: string;
  private selectedQuestionType?: QuestionType;
  public chart: any;
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
          data: graphData[1]
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
      if (data[0].length == 0)
        this.displayChart(false);
    })
  }

  selectedGraphType(graphType: GraphType) {
    if (!this.selectedQuizId) return;
    if (graphType == GraphType.TRIES) this.setTryGraphOptions();
    else {
      this.chart.options.scales.y.suggestedMax = 15;
      this.chart.data.datasets[0].label = "Temps moyen par question";
      this.updateChart(this.statsService.getQuizGraphData(this.patientId!, graphType, this.selectedQuizId, this.selectedQuestionType));
    }
  }

  updateChart(graphData: [string[], number[]]) {
    if (graphData[0].length == 0) {
      this.displayChart(false);
      return;
    }
    this.displayChart(true);
    this.chart.data.labels = graphData[0];
    this.chart.data.datasets[0].data = graphData[1];
    this.chart.update();
  }

  setTryGraphOptions() {
    this.selectedValue = GraphType.TRIES;
    this.chart.data.datasets[0].label = "Taux de réussite";
    this.chart.options.scales.y.suggestedMax = 100;
  }

  displayChart(bool: boolean) {
    if (this.statsContainer) this.statsContainer.nativeElement.style.visibility = (bool) ? "visible" : "hidden";
  }

  quizSelection(quizId?: string, questionType?: QuestionType) {
    this.setTryGraphOptions();
    this.selectedQuizId = quizId;
    this.selectedQuestionType = questionType;
    let chartData = quizId ?
      this.statsService.getQuizGraphData(this.patientId!, GraphType.TRIES, quizId, questionType) :
      this.statsService.getAllQuizzesGraphData(this.patientId!, questionType);
    this.updateChart(chartData);
  }
}
