import {Component, EventEmitter, Output} from "@angular/core";
import {Quiz} from "../../../../models/quiz.models";
import {QuizService} from "../../../../service/quiz-service.service";
import {UserService} from "../../../../service/user.service";
import {Patient} from "../../../../models/patient.models";


@Component({
  selector: 'app-quiz-selection',
  templateUrl: './quiz-selection.component.html',
  styleUrls: ['./quiz-selection.component.scss']
})
export class QuizSelectionComponent {
  public user?: Patient;
  public quizzes?: Quiz[];
  @Output() returnIdQuizSelected: EventEmitter<string> = new EventEmitter<string>();

  constructor(private userService: UserService, private quizService: QuizService) {
    this.userService.user$.subscribe(user => {
      this.user = user as Patient;
    });
    this.quizService.quizzes$.subscribe(quizzes => this.quizzes = quizzes);
  }

  returnQuiz(quiz: Quiz) {
    this.returnIdQuizSelected.emit(quiz.id);
  }
}
