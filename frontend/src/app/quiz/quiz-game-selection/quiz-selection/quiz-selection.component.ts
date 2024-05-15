import {Component, EventEmitter, Input, Output} from "@angular/core";
import {Quiz} from "../../../../models/quiz.models";
import {UserService} from "../../../../service/user.service";
import {Patient} from "../../../../models/patient.models";


@Component({
  selector: 'app-quiz-selection',
  templateUrl: './quiz-selection.component.html',
  styleUrls: ['./quiz-selection.component.scss']
})
export class QuizSelectionComponent {
  public user?: Patient;
  @Input() quizzes?: Quiz[];
  @Output() returnIdQuizSelected: EventEmitter<string> = new EventEmitter<string>();

  constructor(private userService: UserService) {
    this.userService.user$.subscribe(user => {
      this.user = user as Patient;
    });
  }

  returnQuiz(quiz: Quiz) {
    this.returnIdQuizSelected.emit(quiz.id);
  }
}
