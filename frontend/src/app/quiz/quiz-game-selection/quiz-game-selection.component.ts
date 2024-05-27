import {Component, EventEmitter, Output} from "@angular/core";
import {Quiz} from "../../../models/quiz.models";
import {QuizService} from "../../../service/quiz-service.service";
import {UserService} from "../../../service/user.service";
import {Patient} from "../../../models/patient.models";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: "app-quiz-game-selection",
  templateUrl: "./quiz-game-selection.component.html",
  styleUrls: ["./quiz-game-selection.component.scss"]
})
export class QuizGameSelectionComponent {
  public filter: string = "interest";
  public search: string = "";
  public filteredQuizzes?: Quiz[];

  public user?: Patient;
  private quizzes?: Quiz[];
  @Output() returnIdQuizSelected: EventEmitter<String> = new EventEmitter<String>();

  constructor(private userService: UserService, private quizService: QuizService, private route: ActivatedRoute, private router: Router) {
    this.userService.user$.subscribe(user => {
      this.user = user as Patient;
    });
    quizService.quizzes$.subscribe(quizzes => {
      this.quizzes = quizzes;
      this.updateQuizzes();
    });
  }

  playQuiz(quizId: string) {
    this.quizService.startQuiz(quizId, values => this.router.navigate(["quiz", quizId], {relativeTo: this.route}).then());
  }

  updateQuizzes() {
    this.filteredQuizzes = this.quizzes?.filter(quiz => {
      if (!quiz.title.toLowerCase().includes(this.search.toLowerCase())) return false;
      switch (this.filter) {
        case "interest":
          if (!quiz.tags.every(tag => this.user?.hobbies?.includes(tag))) return false;
          break;
        default:
          break;
      }
      return true;
    });
  }
}
