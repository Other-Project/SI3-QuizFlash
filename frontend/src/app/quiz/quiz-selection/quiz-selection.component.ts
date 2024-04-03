import {Component, EventEmitter, Output} from "@angular/core";
import {QuizService} from "../../../service/quiz-service.service";
import {Quiz} from "../../../models/quiz.models";


@Component({
  selector: 'app-quiz-selection',
  templateUrl: './quiz-selection.component.html',
  styleUrls: ['./quiz-selection.component.scss']
})
export class QuizSelectionComponent {
  public quizzes?: Quiz[];
  @Output() returnQuizSelected: EventEmitter<Quiz> = new EventEmitter<Quiz>();

  constructor(public quizListService: QuizService) {
    quizListService.quizzes$.subscribe(quizzes => this.quizzes = quizzes);
  }

  returnQuiz(quiz: Quiz) {
    this.returnQuizSelected.emit(quiz);
  }
}
