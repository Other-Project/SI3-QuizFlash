import {Component} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Quiz} from "../../../../../models/quiz.models";
import {QuizService} from "../../../../../service/quiz-service.service";

@Component({
  selector: "app-admin-quiz",
  templateUrl: "./admin-quiz.component.html",
  styleUrl: "./admin-quiz.component.scss",
  standalone: true
})
export class AdminQuizComponent {
  public quiz?: Quiz;

  constructor(public quizService: QuizService, public route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      let id = params["quiz_id"];
      this.quiz = this.quizService.getQuiz(id);
      if (id && !this.quiz) throw new Error("No quiz was found with this id");
    });
  }
}
