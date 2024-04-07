import {Component} from "@angular/core";
import {ProfileListComponent} from "../../../profiles/profile-list/profile-list.component";
import {QuizModule} from "../../../quiz/quiz.module";
import {Quiz} from "../../../../models/quiz.models";
import {QuizService} from "../../../../service/quiz-service.service";

@Component({
  selector: "app-admin-quizz",
  templateUrl: "./admin-quizz.component.html",
  standalone: true,
  imports: [
    ProfileListComponent,
    QuizModule
  ]
})
export class AdminQuizzComponent {
  public quizzes?: Quiz[];

  constructor(public quizListService: QuizService) {
    quizListService.quizzes$.subscribe(quizzes => this.quizzes = quizzes);
  }

  manageQuiz(quiz: Quiz) {
    console.log(quiz);
  }
}
