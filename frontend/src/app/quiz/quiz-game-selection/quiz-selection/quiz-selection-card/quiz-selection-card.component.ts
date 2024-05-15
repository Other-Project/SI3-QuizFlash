import {Component, EventEmitter, Input, Output} from "@angular/core";
import {Quiz} from "../../../../../models/quiz.models";


@Component({
  selector: 'app-quiz-selection-card',
  templateUrl: './quiz-selection-card.component.html',
  styleUrls: ['./quiz-selection-card.component.scss']
})
export class QuizSelectionCardComponent {
  @Input()
  public quiz!: Quiz;
  @Output() quizReturn: EventEmitter<Quiz> = new EventEmitter<Quiz>();

  constructor() {
  }

  selectQuiz() {
    this.quizReturn.emit(this.quiz);
  }
}
