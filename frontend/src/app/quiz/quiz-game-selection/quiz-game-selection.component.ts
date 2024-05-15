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
  public user?: Patient;
  public quizzes?: Quiz[];
  @Output() returnIdQuizSelected: EventEmitter<String> = new EventEmitter<String>();

  constructor(private userService: UserService, private quizService: QuizService, private route: ActivatedRoute, private router: Router) {
    this.userService.user$.subscribe(user => {
      this.user = user as Patient;
    });
    quizService.quizzes$.subscribe(quizzes => this.quizzes = quizzes);
  }

  playQuiz(quizId: string) {
    this.quizService.selectQuiz(quizId, this.user!);
    this.router.navigate(["quiz", quizId], {relativeTo: this.route}).then();
  }
}
