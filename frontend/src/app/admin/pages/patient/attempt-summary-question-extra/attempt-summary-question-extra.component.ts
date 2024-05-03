import {Component, Input} from "@angular/core";
import {QuestionStats} from "../../../../../models/question-stats.model";
import {QuestionType} from "../../../../../models/question-type.models";
import {Question} from "../../../../../models/question.models";

@Component({
  selector: "attempt-summary-question-extra",
  templateUrl: "attempt-summary-question-extra.component.html",
  styleUrls: ["attempt-summary-question-extra.component.scss"]
})

export class AttemptSummaryQuestionExtraComponent {
  @Input() questionStats!: QuestionStats;
  @Input() question!: Question;
  protected readonly Number = Number;
  protected readonly QuestionType = QuestionType;

  constructor() {
  }
}
