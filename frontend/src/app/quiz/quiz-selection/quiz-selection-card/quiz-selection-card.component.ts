import {Component, Input} from '@angular/core';
import {Quiz} from "../../../../models/quiz.models";


@Component({
  selector: 'app-quiz-selection-card',
  templateUrl: './quiz-selection-card.component.html',
  styleUrls: ['./quiz-selection-card.component.scss']
})
export class QuizSelectionCardComponent {
  @Input()
  public quiz!: Quiz;

  constructor() {
  }
}
