import {Component} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {Quiz} from "../../../../../models/quiz.models";
import {QuizService} from "../../../../../service/quiz-service.service";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {LayoutModule} from "../../../../layout/layout.module";

@Component({
  selector: "app-admin-quiz",
  templateUrl: "./admin-quiz.component.html",
  styleUrl: "./admin-quiz.component.scss",
  imports: [
    ReactiveFormsModule,
    LayoutModule
  ],
  standalone: true
})
export class AdminQuizComponent {
  public quiz?: Quiz;

  quizForm: FormGroup = new FormGroup({
    title: new FormControl("", [Validators.required]),
    theme: new FormControl("", [Validators.required]),
    thumbnailUrl: new FormControl("")
  });

  constructor(public quizService: QuizService, private route: ActivatedRoute, private router: Router) {
    this.quizService.quiz$.subscribe(quiz => {
      this.quiz = quiz;
      this.quizForm.setValue({
        title: this.quiz?.title ?? "",
        theme: this.quiz?.theme ?? "",
        thumbnailUrl: this.quiz?.thumbnailUrl ?? ""
      });
    });
    this.route.params.subscribe(params => {
      let id = params["quiz_id"];
      this.quizService.selectQuiz(id);
    });
  }

  save() {
    if (this.quizForm.valid) {
      if (this.quiz) return this.quizService.updateQuiz(this.quiz.id, this.quizForm.value);
      let id = this.quizService.addQuiz(this.quizForm.value);
      this.router.navigate([id], {relativeTo: this.route}).then();
    }
  }
}
