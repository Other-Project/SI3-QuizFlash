import {Component, Input} from "@angular/core";
import {Quiz} from "../../../../../models/quiz.models";
import {QuestionStats} from "../../../../../models/question-stats.model";
import {faReply} from "@fortawesome/free-solid-svg-icons";
import {QuestionType} from "../../../../../models/question-type.models";


@Component({
  selector: "attempt-summary-details",
  templateUrl: "attempt-summary-details-part.component.html",
  styleUrls: ["attempt-summary-details-part.component.scss"]
})

export class AttemptSummaryDetailsPartComponent {
  @Input() question!: QuestionStats;
  @Input() quiz!: Quiz;

  protected readonly QuestionType = QuestionType;
  protected readonly faReply = faReply;

  constructor() {
  }

  getQuestion(questionId: string) {
    return this.quiz.questions.find(question => question.id == questionId)!;
  }

  numberOfAttemptArray(number: number) {
    return Array(number).fill(0).map((x, i) => i);
  }
}
