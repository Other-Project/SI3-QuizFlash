import {Component, Input, OnInit, ViewChild} from "@angular/core";
import {Patient} from "../../../../../models/patient.models";
import {QuestionType} from "../../../../../models/question-type.models";
import {StatisticsGraphComponent} from "../statistics-graph/statistics-graph.component";
import {DataTypes, StatsFilter} from "../../../../../models/stats-enumerates";
import {StatisticsService} from "../../../../../service/statistics.service";
import {Quiz} from "../../../../../models/quiz.models";

@Component({
  selector: "statistics",
  templateUrl: 'statistics.component.html',
  styleUrls: ['statistics.component.scss']
})

export class StatisticsComponent implements OnInit {
  protected patientPlayedQuizzes: Quiz[] = [];
  protected graphData!: [string[], number[]];
  protected data?: any;
  private statFilter: StatsFilter = StatsFilter.TRY;
  protected dataType: DataTypes = DataTypes.SUCCESS;
  private quizId?: string;
  private questionType?: QuestionType;
  @ViewChild(StatisticsGraphComponent) graph!: StatisticsGraphComponent;
  @Input() public patient!: Patient;

  constructor(private statisticsService: StatisticsService) {
    this.statisticsService.graphData$.subscribe(graphData => {
      let keys = graphData.map(data => data.key);
      let values = graphData.map(data => data.value);
      this.graphData = [keys, values];
    });
    this.statisticsService.data$.subscribe(data => this.data = data);
  }

  quizSelection(quizSelectionData: { quizId?: string, questionType?: QuestionType }) {
    this.quizId = quizSelectionData.quizId;
    this.questionType = quizSelectionData.questionType;
    this.statFilter = StatsFilter.TRY;
    this.dataType = DataTypes.SUCCESS;
    this.updateStats();
    this.graph?.quizSelection(quizSelectionData.quizId);
  }

  optionSelection(options: { dataType: DataTypes, statFilter: StatsFilter }) {
    this.dataType = options.dataType;
    this.statFilter = options.statFilter;
    this.updateStats();
  }

  updateStats() {
    this.statisticsService.refreshUserStatistics(this.patient.id!, this.dataType, this.statFilter, this.quizId, this.questionType);
  }

  async ngOnInit(): Promise<void> {
    this.patientPlayedQuizzes = await this.statisticsService.getUserQuizzesParticipation(parseInt(this.patient.id));
    this.updateStats();
  }
}
