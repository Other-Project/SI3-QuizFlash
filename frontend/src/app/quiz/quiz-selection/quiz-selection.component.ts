import {Component, OnInit} from '@angular/core';
import {QuizListService} from "../../../service/quiz-list-service.service";
import {Quiz} from "../../../models/quiz.models";


@Component({
  selector: 'app-quiz-selection',
  templateUrl: './quiz-selection.component.html',
  styleUrls: ['./quiz-selection.component.scss']
})
export class QuizSelectionComponent {
  public quizzes?: Quiz[];

  constructor(public quizListService: QuizListService) {
    quizListService.quizz$.subscribe(quizzes => this.quizzes = quizzes);
  }
}
