import {Component} from "@angular/core";
import {ProfileListComponent} from "../../../profiles/profile-list/profile-list.component";
import {Quiz} from "../../../../models/quiz.models";
import {QuizService} from "../../../../service/quiz-service.service";
import {LayoutModule} from "../../../layout/layout.module";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faAdd} from "@fortawesome/free-solid-svg-icons";
import {QuizGameSelectionModule} from "../../../quiz/quiz-game-selection/quiz-game-selection.module";
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {UtilsService} from "../../../../service/utils.service";

@Component({
  selector: "app-admin-quizzes",
  templateUrl: "./admin-quizzes.component.html",
  styleUrls: ["./admin-quizzes.component.scss"],
  standalone: true,
  imports: [
    ProfileListComponent,
    QuizGameSelectionModule,
    LayoutModule,
    RouterLink,
    FaIconComponent,
    FormsModule,
    NgForOf
  ]
})
export class AdminQuizzesComponent {
  public filter: string = "all";
  public tags: string[] = [];
  public search: string = "";
  private allQuizzes?: Quiz[];
  public quizzes?: Quiz[];

  constructor(public quizService: QuizService, private utilsService: UtilsService, public router: Router, public route: ActivatedRoute) {
    this.utilsService.getTags().then(values => {
      this.tags = [...new Set(values)];
    }).catch(() => {
      alert("Il y a eu une erreur lors de la récupération des différents centres d'intérêt.\nVeuillez recharger la page");
    });
    quizService.quizzes$.subscribe(quizzes => this.quizzes = this.allQuizzes = quizzes);
  }

  searchQuiz(text: string) {
    this.updateQuizzes();
  }

  manageQuiz(quizId: string) {
    this.router.navigate(["./quiz", quizId], {relativeTo: this.route}).then();
  }

  updateQuizzes() {
    this.quizzes = this.allQuizzes?.filter(quiz => {
      if (!quiz.title.toLowerCase().includes(this.search.toLowerCase())) return false;
      switch (this.filter) {
        case "all":
          break;
        default:
          if (!quiz.tags.some(tag => tag == this.filter)) return false;
          break;
      }
      return true;
    });
  }

  protected readonly faAdd = faAdd;
}
