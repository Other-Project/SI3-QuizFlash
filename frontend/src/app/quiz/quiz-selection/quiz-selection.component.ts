import {Component, EventEmitter, Output} from "@angular/core";
import {Quiz} from "../../../models/quiz.models";
import {QuizService} from "../../../service/quiz-service.service";
import {UserService} from "../../../service/user.service";
import {Patient} from "../../../models/patient.models";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-quiz-selection',
  templateUrl: './quiz-selection.component.html',
  styleUrls: ['./quiz-selection.component.scss']
})
export class QuizSelectionComponent {
  public user?: Patient;
  public quizzes?: Quiz[];
  @Output() returnIdQuizSelected: EventEmitter<String> = new EventEmitter<String>();

  constructor(private userService: UserService, private quizService: QuizService, private route: ActivatedRoute, private router: Router) {
    this.userService.user$.subscribe(user => {
      this.user = user as Patient;
    });
    quizService.quizzes$.subscribe(quizzes => this.quizzes = quizzes);
  }

  returnQuiz(quiz: Quiz) {
    this.quizService.selectQuiz(quiz.id, this.user!);
    this.returnIdQuizSelected.emit(quiz.id);
    this.router.navigate([quiz.id], {relativeTo: this.route}).then();
  }
}
