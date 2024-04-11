import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {QuizService} from "../../../../../service/quiz-service.service";
import {Quiz} from "../../../../../models/quiz.models";
import {StatisticsService} from "../../../../../service/statistics.service";
import {QuestionType} from "../../../../../models/question-type.models";

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
    this.resetAllQuizzesData();
  }

  resetAllQuizzesData(questionType?: QuestionType) {
    this.successRate = this.statisticsService.getAllQuizzesSuccessRate(this.patientId!, questionType);
    this.answerHintRate = this.statisticsService.getAllQuizzesAnswerHintRate(this.patientId!, questionType);
  }

  quizChoice(quizId: string, stringQuestionType: string): void {
    this.quizSelected = quizId != "all";
    const questionType: QuestionType | undefined = StatisticsService.getQuestionType(stringQuestionType);

    this.quizSelection?.emit({quizId, questionType});

    if (quizId == "all") {
      this.resetAllQuizzesData(questionType);
      return;
    }

    this.successRate = this.statisticsService.getQuizSuccessRate(this.patientId!, quizId, questionType);
    const timeData = this.statisticsService.getTimeDataForQuiz(this.patientId!, quizId, questionType);
    this.spentTime = timeData[0];
    this.averageTimeSpent = timeData[1];
  }
}

