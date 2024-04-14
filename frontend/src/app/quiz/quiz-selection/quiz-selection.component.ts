import {Component, EventEmitter, Input, Output} from "@angular/core";
import {Quiz} from "../../../models/quiz.models";


@Component({
  selector: 'app-quiz-selection',
  templateUrl: './quiz-selection.component.html',
  styleUrls: ['./quiz-selection.component.scss']
})
export class QuizSelectionComponent {
  @Input() public quizzes?: Quiz[];
  @Output() returnQuizSelected: EventEmitter<Quiz> = new EventEmitter<Quiz>();

  constructor() {
  }

  returnQuiz(quiz: Quiz) {
    this.returnQuizSelected.emit(quiz);
  }
}
