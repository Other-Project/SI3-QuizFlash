import {Component, Input} from "@angular/core";
import {QuestionStats} from "../../../../../models/question-stats.model";

@Component({
  selector: "attempt-summary-stats",
  templateUrl: "attempt-summary-stats-part.component.html",
  styleUrls: ["attempt-summary-stats-part.component.scss"]
})

export class AttemptSummaryStatsPartComponent {
  @Input() question!: QuestionStats;

  constructor() {
  }

  fiftyFiftyUse() {
    return this.question.attempts.some(attempt => attempt.answerHint);
  }

  getTimeSpent() {
    return this.question.attempts.map(attempt => attempt.timeSpent).reduce((acc, c) => acc + c, 0);
  }
}
