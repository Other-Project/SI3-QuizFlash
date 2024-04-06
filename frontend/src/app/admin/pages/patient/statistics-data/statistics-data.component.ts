import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {QuizService} from "../../../../../service/quiz-service.service";
import {Quiz} from "../../../../../models/quiz.models";
import {StatisticsService} from "../../../../../service/statistics.service";

@Component({
  selector: 'stats-data',
  templateUrl: 'statistics-data.component.html',
  styleUrls: ['statistics-data.component.scss']
})

export class StatisticsDataComponent implements OnInit{
  @Input() answerHint?: boolean;
  @Input() patientId?: string;

  @Output() quizSelection: EventEmitter<any> = new EventEmitter<any>();


  questionTypes: string[] = ["Questions auditives", "Questions visuelles", "Questions textuelles"];
  successRate: number = 0;
  answerHintRate: number = 0;
  spentTime: number = 0;
  averageTimeSpent: number = 0;
  quizList?: Quiz[];
  quizSelected: boolean = false;

  constructor(private quizListService: QuizService, private statisticsService: StatisticsService) {
  }

  ngOnInit(): void {
    this.quizListService.quizzes$.subscribe((quizzes: Quiz[]) => {
      this.quizList = quizzes;
    });
    this.resetAllQuizzesData("all");
  }

  resetAllQuizzesData(questionType: string) {
    this.successRate = this.statisticsService.getAllQuizzesSuccessRate(this.patientId!, questionType);
    this.answerHintRate = this.statisticsService.getAllQuizzesAnswerHintRate(this.patientId!, questionType);
  }

  quizChoice(quizId: string, questionType: string): void {
    if (quizId == "all") {
      this.resetAllQuizzesData(questionType);
      return;
    }

    this.quizSelection?.emit({quizId, questionType});
    this.successRate = this.statisticsService.getQuizSuccessRate(this.patientId!, quizId, questionType);
    const timeData = this.statisticsService.getTimeDataForQuiz(this.patientId!, quizId, questionType);
    this.spentTime = timeData[0];
    this.averageTimeSpent = timeData[1];
    this.quizSelected = quizId!="all";
  }
}

