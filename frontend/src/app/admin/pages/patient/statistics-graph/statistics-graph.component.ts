import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild} from "@angular/core";
import Chart from 'chart.js/auto';
import {StatisticsService} from "../../../../../service/statistics.service";
import {Observable, Subscription} from "rxjs";
import {GraphType} from "../../../../../models/graph-type.model";


@Component({
  selector: 'stats-graph',
  templateUrl: 'statistics-graph.component.html',
  styleUrls: ['statistics-graph.component.scss']
})

export class StatisticsGraphComponent implements OnInit, AfterViewInit {
  @Input() quizSelectionEvent?: Observable<{ quizId: string, questionType: string }>;
  @Input() title: string = "";
  @Input() patientId?: string;

  @ViewChild("statsContainer") statsContainer?: ElementRef;

  protected selectedQuizId?: string;
  private selectedQuestionType?: string;
  private eventSubscription?: Subscription;
  public chart: any;
  selectedValue: string = "tries";

  constructor(private statsService: StatisticsService, private cd: ChangeDetectorRef) {
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

  ngOnInit(): void {
    this.eventSubscription = this.quizSelectionEvent?.subscribe((quizId) => this.quizSelection(quizId));
  }

  ngAfterViewInit(): void {
    let data = this.statsService.getAllQuizzesGraphData(this.patientId!, "all");
    this.createChart(data);
    if (data[0].length == 0)
      this.displayChart(false);
    this.cd.detectChanges();
  }

  selectedGraphType(selectedMode: string) {
    if (this.selectedQuizId && this.selectedQuestionType) {
      if (selectedMode == "tries") {
        this.setTryGraphOptions();
        this.updateChart(this.statsService.getQuizGraphData(this.patientId!, this.selectedQuizId, this.selectedQuestionType, GraphType.TRIES));
      } else {
        this.chart.options.scales.y.suggestedMax = 15;
        this.chart.data.datasets[0].label = "Temps moyen par question";
        this.updateChart(this.statsService.getQuizGraphData(this.patientId!, this.selectedQuizId, this.selectedQuestionType, GraphType.TIME));
      }
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
    this.selectedValue = "tries";
    this.chart.data.datasets[0].label = "Taux de réussite";
    this.chart.options.scales.y.suggestedMax = 100;
  }

  displayChart(bool: boolean) {
    if (this.statsContainer) this.statsContainer.nativeElement.style.display = (bool) ? "block" : "none";
  }

  quizSelection(quizSelectionData: { quizId: string, questionType: string }) {
    this.setTryGraphOptions();
    this.selectedQuizId = quizSelectionData.quizId;
    this.selectedQuestionType = quizSelectionData.questionType;
    if (quizSelectionData.quizId == "all")
      this.updateChart(this.statsService.getAllQuizzesGraphData(this.patientId!, this.selectedQuestionType));
    this.updateChart(this.statsService.getQuizGraphData(this.patientId!, this.selectedQuizId, this.selectedQuestionType, GraphType.TRIES));
  }
}
