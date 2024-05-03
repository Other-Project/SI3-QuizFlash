import {Component, Input} from "@angular/core";
import {Quiz} from "../../../../../models/quiz.models";
import {QuestionStats} from "../../../../../models/question-stats.model";
import {QuestionType} from "../../../../../models/question-type.models";

@Component({
  selector: "attempt-summary-question-type",
  templateUrl: "attempt-summary-question-type.component.html",
  styleUrls: ["attempt-summary-question-type.component.scss"]
})

export class AttemptSummaryQuestionTypeComponent {
  @Input() question!: QuestionStats;
  @Input() quiz!: Quiz;
  @Input() description!: boolean;
  protected readonly Number = Number;
  protected readonly QuestionType = QuestionType;
  protected typeDictionaryText = {
    [QuestionType.TextOnly]: "Textuelle",
    [QuestionType.Image]: "Visuelle",
    [QuestionType.Sound]: "Sonore",
  };

  constructor() {
  }
}
