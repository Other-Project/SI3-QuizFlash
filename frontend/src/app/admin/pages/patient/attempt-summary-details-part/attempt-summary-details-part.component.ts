import {Component, Input} from "@angular/core";
import {QuestionStats} from "../../../../../models/question-stats.model";
import {faReply} from "@fortawesome/free-solid-svg-icons";
import {QuestionType} from "../../../../../models/question-type.models";
import {Question} from "../../../../../models/question.models";
import {Answer} from "../../../../../models/answer.models";


@Component({
  selector: "attempt-summary-details",
  templateUrl: "attempt-summary-details-part.component.html",
  styleUrls: ["attempt-summary-details-part.component.scss"]
})

export class AttemptSummaryDetailsPartComponent {
  @Input() questionStat!: QuestionStats;
  @Input() question!: Question;

  protected readonly QuestionType = QuestionType;
  protected readonly faReply = faReply;

  constructor() {
  }

  getAnswerClass(attemptAnswer: string, answer: Answer) {
    if (answer.id == attemptAnswer) return answer.trueAnswer ? "right" : "wrong";
    if (answer.trueAnswer) return "notFound";
    let answerIndex = this.questionStat.chosenAnswersId.indexOf(answer.id);
    if (answerIndex >= 0 && answerIndex < this.questionStat.chosenAnswersId.indexOf(attemptAnswer) || this.questionStat.hiddenAnswers.includes(answer.id)) return "hidden";
    return undefined;
  }
}
