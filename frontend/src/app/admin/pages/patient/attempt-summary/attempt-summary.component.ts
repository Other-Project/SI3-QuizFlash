import {Component, Input, OnInit} from "@angular/core";
import {Patient} from "../../../../../models/patient.models";
import {Quiz} from "../../../../../models/quiz.models";
import {QuizService} from "../../../../../service/quiz-service.service";
import {QuestionType} from "../../../../../models/question-type.models";
import {faQuestion} from "@fortawesome/free-solid-svg-icons";
import {QuestionStats} from "../../../../../models/question-stats.model";
import {Question} from "../../../../../models/question.models";


@Component({
  selector: "attempt-summary",
  templateUrl: "attempt-summary.component.html",
  styleUrls: ["attempt-summary.component.scss"]
})

export class AttemptSummaryComponent implements OnInit {
  @Input() user?: Patient;
  @Input() questionsStats: QuestionStats[] = [];
  protected quiz?: Quiz;
  protected showDetails: boolean[] = [];
  protected question?: Question;


  protected readonly QuestionType = QuestionType;
  protected readonly faQuestion = faQuestion;

  constructor(private quizService: QuizService) {
  }

  ngOnInit() {
    this.quizService.quiz$.subscribe(quiz => this.quiz = quiz);
    this.showDetails = this.questionsStats ? Array(this.questionsStats.length).fill(false) : [];
  }

  setDetail(index: number) {
    this.showDetails[index] = !this.showDetails[index];
  }

  getQuestion(questionId: string) {
    return this.quiz?.questions.find(question => question.id == questionId)!;
  }
}
