import {Component} from "@angular/core";
import {UserService} from "../../service/user.service";
import {User} from "../../models/user.models";
import {QuizService} from "../../service/quiz-service.service";
import {Quiz} from "../../models/quiz.models";

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent {
  public user?: User;
  public quiz?: Quiz;

  constructor(private userService: UserService, public quizService: QuizService) {
    this.userService.user$.subscribe(user => this.user = user);
    this.quizService.quiz$.subscribe(quiz => this.quiz = quiz);
  }
}
