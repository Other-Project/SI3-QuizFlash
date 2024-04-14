import {AfterViewInit, Component, Input} from "@angular/core";
import Chart from "chart.js/auto";
import {StatisticsService} from "../../../../../service/statistics.service";
import {DataTypes, StatsFilter} from "../../../../../models/stats-enumerates";
import {QuestionType} from "../../../../../models/question-type.models";


@Component({
  selector: "stats-graph",
  templateUrl: "statistics-graph.component.html",
  styleUrls: ["statistics-graph.component.scss"]
})

export class StatisticsGraphComponent implements AfterViewInit {
  protected readonly StatsFilter = StatsFilter;
  protected readonly DataType = DataTypes;
  @Input() title: string = "";
  @Input() patientId?: string;

  protected dataAvailable: boolean = false;
  protected selectedQuizId?: string;
  private selectedQuestionType?: QuestionType;
  public chart?: Chart;
  protected filter: StatsFilter = StatsFilter.TRIES;
  protected dataType: DataTypes = DataTypes.SUCCESS_RATE;


  constructor(private statsService: StatisticsService) {
  }

  createChart(graphData: [string[], number[]]) {
    this.dataAvailable = graphData[0].length != 0;
    this.chart = new Chart("stat-chart", {
      type: "line",
      data: {
        labels: graphData[0],
        datasets: [{
          label: this.dataType,
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
            title: {
              display: true,
              text: this.dataType
            },
            suggestedMin: 0,
            suggestedMax: 100
          },
          x: {
            title: {
              display: true,
              text: this.filter
            }
          }
        }
      }
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.createChart(this.statsService.getSuccessRatePerTry(this.patientId!));
    });
  }

  selectedGraphType(filter: StatsFilter, dataType: DataTypes, graphData?: [string[], number[]]) {
    this.dataType = dataType;
    this.filter = filter;
    if (!this.chart) return;
    this.updateChart(graphData ?? this.getQuizGraphData(this.patientId!, dataType, filter, this.selectedQuizId!, this.selectedQuestionType));
  }

  updateChart(graphData: [string[], number[]]) {
    this.dataAvailable = graphData[0].length != 0;
    if (graphData[0].length == 0 || !this.chart) return;

    this.chart.options = {
      responsive: true,
      aspectRatio: 2.5,
      scales: {
        y: {
          title: {
            display: true,
            text: this.dataType
          },
          suggestedMin: 0,
          suggestedMax: (this.dataType == DataTypes.SUCCESS_RATE) ? 100
            : Math.max.apply(null, graphData[1]) * 1.5
        },
        x: {
          title: {
            display: true,
            text: this.filter
          }
        }
      }
    };

    this.chart.data.labels = graphData[0];
    this.chart.data.datasets[0].data = graphData[1].map(value => Math.round(value * 10) / 10);
    this.chart.data.datasets[0].label = this.dataType;
    this.chart.update();
  }

  quizSelection(quizId?: string, questionType?: QuestionType) {
    if (!this.patientId) return;
    this.dataType = DataTypes.SUCCESS_RATE;
    this.filter = StatsFilter.TRIES;
    this.selectedQuizId = quizId;
    this.selectedQuestionType = questionType;
    this.selectedGraphType(this.filter, this.dataType, this.statsService.getSuccessRatePerTry(this.patientId, quizId, questionType));
  }

  getQuizGraphData(patientId: string, dataType: DataTypes, filter: StatsFilter, quizId: string, questionType?: QuestionType) {
    if (filter == StatsFilter.TRIES)
      return (dataType == DataTypes.TIME_AVERAGE)
        ? this.statsService.getTimePerTries(patientId, quizId, questionType)
        : this.statsService.getSuccessRatePerTry(patientId, quizId, questionType);
    else return (dataType == DataTypes.TIME_AVERAGE)
      ? this.statsService.getTimePerQuestion(patientId, quizId, questionType)
      : this.statsService.getSuccessRatePerQuestion(patientId, quizId, questionType);
  }
}
