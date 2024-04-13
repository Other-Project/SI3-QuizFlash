import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {QuizService} from "../../../../../service/quiz-service.service";
import {Quiz} from "../../../../../models/quiz.models";
import {StatisticsService} from "../../../../../service/statistics.service";
import {QuestionType} from "../../../../../models/question-type.models";

@Component({
  selector: "stats-data",
  templateUrl: "statistics-data.component.html",
  styleUrls: ["statistics-data.component.scss"]
})

export class StatisticsDataComponent implements OnInit {
  @Input() answerHint?: boolean;
  @Input() patientId?: string;

  @Output() quizSelection: EventEmitter<any> = new EventEmitter<any>();

  questionTypes = {
    [-1]: "Tous les types de questions",
    [QuestionType.Sound]: "Questions auditives",
    [QuestionType.Image]: "Questions visuelles",
    [QuestionType.TextOnly]: "Questions textuelles"
  };

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
    this.quizChoice();
  }

  quizChoice(quizId?: string, questionType?: QuestionType): void {
    this.quizSelected = quizId != "";
    if (questionType == -1 as QuestionType) questionType = undefined;
    this.quizSelection?.emit({quizId, questionType});

    this.successRate = this.statisticsService.getSuccessRate(this.patientId!, quizId, questionType);
    this.answerHintRate = this.statisticsService.getAnswerHintRate(this.patientId!, quizId, questionType);
    if (quizId) [this.spentTime, this.averageTimeSpent] = this.statisticsService.getTime(this.patientId!, quizId, questionType);
  }
}

