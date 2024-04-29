import {Component, Input, OnInit} from "@angular/core";
import {HistoricService} from "../../../../../service/historic.service";
import {Patient} from "../../../../../models/patient.models";
import {QuizStats} from "../../../../../models/quiz-stats.model";
import {Quiz} from "../../../../../models/quiz.models";
import {QuizService} from "../../../../../service/quiz-service.service";
import {QuestionType} from "../../../../../models/question-type.models";
import {faQuestion, faReply} from "@fortawesome/free-solid-svg-icons";
import {Answer} from "../../../../../models/answer.models";


@Component({
  selector: "attempt-summary",
  templateUrl: "attempt-summary.component.html",
  styleUrls: ["attempt-summary.component.scss"]
})

export class AttemptSummaryComponent implements OnInit {
  @Input() user?: Patient;
  protected quiz?: Quiz;
  protected attempt?: [QuizStats, Date];
  protected detail: boolean[] = [];

  protected readonly Number = Number;
  protected readonly QuestionType = QuestionType;
  protected readonly faQuestion = faQuestion;
  protected readonly faReply = faReply;

  constructor(private quizService: QuizService, private historicService: HistoricService) {
  }

  ngOnInit() {
    this.quizService.quiz$.subscribe((quiz?: Quiz) => {
      this.quiz = quiz;
    });
    this.historicService.attempt_summary$.subscribe((attempt => {
      this.attempt = attempt;
      this.detail = [];
      if (attempt) for (let i = 0; i < attempt[0].questionsStats.length; i++) (this.detail.push(false));
    }));
  }

  chosen(questionId: string, answer: Answer) {
    return this.attempt![0].questionsStats.find(question => question.questionId == questionId)!.answerChosenId == answer.id;
  }

  setDetail(index: number) {
    this.detail[index] = !this.detail[index];
  }
}
