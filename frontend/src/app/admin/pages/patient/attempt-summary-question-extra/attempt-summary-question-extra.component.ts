import {Component, Input} from "@angular/core";
import {Quiz} from "../../../../../models/quiz.models";
import {QuestionStats} from "../../../../../models/question-stats.model";
import {QuestionType} from "../../../../../models/question-type.models";

@Component({
  selector: "attempt-summary-question-extra",
  templateUrl: "attempt-summary-question-extra.component.html",
  styleUrls: ["attempt-summary-question-extra.component.scss"]
})

export class AttemptSummaryQuestionExtraComponent {
  @Input() question!: QuestionStats;
  @Input() quiz!: Quiz;
  @Input() description!: boolean;
  protected readonly Number = Number;
  protected readonly QuestionType = QuestionType;

  constructor() {
  }

  getQuestion(questionId: string) {
    return this.quiz.questions.find(question => question.id == questionId)!;
  }
}
