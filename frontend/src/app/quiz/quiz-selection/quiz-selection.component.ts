import {Component, EventEmitter, Output} from "@angular/core";
import {QuizListService} from "../../../service/quiz-list-service.service";
import {Quiz} from "../../../models/quiz.models";


@Component({
  selector: 'app-quiz-selection',
  templateUrl: './quiz-selection.component.html',
  styleUrls: ['./quiz-selection.component.scss']
})
export class QuizSelectionComponent {
  public quizzes?: Quiz[];
  @Output() returnValue: EventEmitter<Quiz> = new EventEmitter<Quiz>();

  constructor(public quizListService: QuizListService) {
    quizListService.quizzes$.subscribe(quizzes => this.quizzes = quizzes);
  }

  returnQuiz(quiz: Quiz) {
    this.returnValue.emit(quiz);
  }
}
