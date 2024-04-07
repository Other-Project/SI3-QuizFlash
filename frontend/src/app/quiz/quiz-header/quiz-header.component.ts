import {Component, EventEmitter, Input, Output} from "@angular/core";

@Component({
  selector: 'quiz-header',
  templateUrl: './quiz-header.component.html',
  styleUrls: ['./quiz-header.component.scss']
})

export class QuizHeaderComponent {
  @Input() hintActivated: boolean = false;
  @Input() counter?: number;
  @Input() quizTheme?: string;
  @Input() numberOfQuestion?: number;
  @Input() fiftyFiftyUsable: boolean = true;

  @Output() hintAnswer: EventEmitter<undefined> = new EventEmitter<undefined>();

  constructor() {
  }

  fiftyFifty() {
    if (this.fiftyFiftyUsable) this.hintAnswer.emit();
  }
}
