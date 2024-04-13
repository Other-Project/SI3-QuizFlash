import {Component} from "@angular/core";
import {ProfileListComponent} from "../../../profiles/profile-list/profile-list.component";
import {QuizModule} from "../../../quiz/quiz.module";
import {Quiz} from "../../../../models/quiz.models";
import {QuizService} from "../../../../service/quiz-service.service";
import {LayoutModule} from "../../../layout/layout.module";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faAdd} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-admin-quizzes",
  templateUrl: "./admin-quizzes.component.html",
  styleUrls: ["./admin-quizzes.component.scss"],
  standalone: true,
  imports: [
    ProfileListComponent,
    QuizModule,
    LayoutModule,
    RouterLink,
    FaIconComponent
  ]
})
export class AdminQuizzesComponent {
  private allQuizzes?: Quiz[];
  public quizzes?: Quiz[];

  constructor(public quizService: QuizService, public router: Router, public route: ActivatedRoute) {
    quizService.quizzes$.subscribe(quizzes => this.quizzes = this.allQuizzes = quizzes);
  }

  searchQuiz(text: string) {
    this.quizzes = text ? this.allQuizzes?.filter(quiz => quiz.title.toLowerCase().includes(text!.toLowerCase())) : this.allQuizzes;
  }

  manageQuiz(quiz: Quiz) {
    this.router.navigate(["./quiz", quiz.id], {relativeTo: this.route}).then();
  }

  protected readonly faAdd = faAdd;
}