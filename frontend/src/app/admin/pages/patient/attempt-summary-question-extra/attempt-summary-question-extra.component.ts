import {Component, Input} from "@angular/core";
import {QuestionType} from "../../../../../models/question-type.models";
import {Question} from "../../../../../models/question.models";

@Component({
  selector: "attempt-summary-question-extra",
  templateUrl: "attempt-summary-question-extra.component.html",
  styleUrls: ["attempt-summary-question-extra.component.scss"]
})

export class AttemptSummaryQuestionExtraComponent {
  @Input() question!: Question;
  protected readonly Number = Number;
  protected readonly QuestionType = QuestionType;

  constructor() {
  }
}
