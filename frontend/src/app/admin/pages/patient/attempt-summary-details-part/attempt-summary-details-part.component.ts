import {Component, Input} from "@angular/core";
import {QuestionStats} from "../../../../../models/question-stats.model";
import {faReply} from "@fortawesome/free-solid-svg-icons";
import {QuestionType} from "../../../../../models/question-type.models";
import {Question} from "../../../../../models/question.models";
import {Answer} from "../../../../../models/answer.models";
import {Attempt} from "../../../../../models/attempt.model";


@Component({
  selector: "attempt-summary-details",
  templateUrl: "attempt-summary-details-part.component.html",
  styleUrls: ["attempt-summary-details-part.component.scss"]
})

export class AttemptSummaryDetailsPartComponent {
  @Input() questionStat!: QuestionStats;
  @Input() question!: Question;
  @Input() fiftyFiftyUsableOrUseInAttempt!: boolean;

  protected readonly QuestionType = QuestionType;
  protected readonly faReply = faReply;

  constructor() {
  }

  getAnswerClass(attempt: Attempt, answer: Answer, i: number) {
    if (answer.id == attempt.chosenAnswersId) return answer.trueAnswer ? "right" : "wrong";
    if (answer.trueAnswer) return "notFound";
    let answerIndex = this.questionStat.attempts.indexOf(this.questionStat.attempts.find(a => a.chosenAnswersId == answer.id) ?? {} as Attempt);
    if (answerIndex >= 0 && answerIndex < i || this.questionStat.attempts[i].hiddenAnswers.includes(answer.id)) return "hidden";
    return undefined;
  }
}
