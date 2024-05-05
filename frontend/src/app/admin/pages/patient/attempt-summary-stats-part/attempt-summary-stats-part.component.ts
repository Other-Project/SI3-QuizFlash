import {Component, Input} from "@angular/core";
import {Patient} from "../../../../../models/patient.models";
import {QuestionStats} from "../../../../../models/question-stats.model";

@Component({
  selector: "attempt-summary-stats",
  templateUrl: "attempt-summary-stats-part.component.html",
  styleUrls: ["attempt-summary-stats-part.component.scss"]
})

export class AttemptSummaryStatsPartComponent {
  @Input() question!: QuestionStats;
  @Input() user!: Patient;

  constructor() {
  }
}
