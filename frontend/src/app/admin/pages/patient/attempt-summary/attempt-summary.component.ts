import {Component, Input, OnInit} from "@angular/core";
import {Patient} from "../../../../../models/patient.models";
import {Quiz} from "../../../../../models/quiz.models";
import {QuizService} from "../../../../../service/quiz-service.service";
import {QuestionType} from "../../../../../models/question-type.models";
import {faQuestion} from "@fortawesome/free-solid-svg-icons";
import {QuestionStats} from "../../../../../models/question-stats.model";
import {Question} from "../../../../../models/question.models";
import {StatisticsService} from "../../../../../service/statistics.service";


@Component({
  selector: "attempt-summary",
  templateUrl: "attempt-summary.component.html",
  styleUrls: ["attempt-summary.component.scss"]
})

export class AttemptSummaryComponent implements OnInit {
  @Input() user?: Patient;
  protected quiz?: Quiz;
  protected detail: boolean[] = [];
  protected question?: Question;
  protected questionsStats: QuestionStats[] = [];


  protected readonly QuestionType = QuestionType;
  protected readonly faQuestion = faQuestion;

  constructor(private quizService: QuizService, private statisticsService: StatisticsService) {
  }

  ngOnInit() {
    this.quizService.quiz$.subscribe(quiz => this.quiz = quiz);
    this.statisticsService.attempt_summary$.subscribe((attempt => {
      this.questionsStats = attempt?.questionsStats ?? [];
      this.detail = attempt ? Array(attempt.questionsStats.length).fill(false) : [];
    }));
  }

  setDetail(index: number) {
    this.detail[index] = !this.detail[index];
  }

  getQuestion(questionId: string) {
    return this.quiz?.questions.find(question => question.id == questionId)!;
  }
}
