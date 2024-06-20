import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {Answer} from "../../../../models/answer.models";
import {Padding, Scale} from "../../../layout/button/button.component";

@Component({
  selector: 'answers-section',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.scss']
})
export class AnswersComponent implements OnInit {

  @Input() answers: Answer[] = [];
  @Input() automatedSkip: boolean = false;
  @Input() fiftyFiftyUsable!: boolean;
  @Input() fiftyFiftyActivated!: boolean;
  protected readonly Scale = Scale;
  protected readonly Padding = Padding;
  private timeOutId?: number;
  @Output() inactive: EventEmitter<undefined> = new EventEmitter();
  @Output() fiftyFiftyUsed: EventEmitter<undefined> = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
    if (this.automatedSkip) this.timeOutId = setTimeout(() => this.stopQuiz(), 900000); //15 minutes
  }

  @Output() returnedAnswer = new EventEmitter<Answer>();

  returnAnswer(value: Answer) {
    clearTimeout(this.timeOutId);
    this.returnedAnswer.emit(value); //To return value to the quiz-section.component
  }

  fiftyFifty() {
    this.fiftyFiftyUsed.emit();
  }

  stopQuiz() {
    this.inactive.emit();
  }

  fiftyFiftyShow() {
    return !this.fiftyFiftyUsable && this.answers.filter(answer => !answer.hide).length > 2;
  }
}
