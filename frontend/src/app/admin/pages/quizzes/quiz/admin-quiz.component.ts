import {Component, OnDestroy} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {Quiz} from "../../../../../models/quiz.models";
import {QuizService} from "../../../../../service/quiz-service.service";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {LayoutModule} from "../../../../layout/layout.module";
import {AdminQuestionsComponent} from "./questions/admin-questions.component";
import {faAdd, faSave, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {Question} from "../../../../../models/question.models";
import {NgIf} from "@angular/common";
import {NgMultiSelectDropDownModule} from "ng-multiselect-dropdown";
import {UserService} from "../../../../../service/user.service";

@Component({
  selector: "app-admin-quiz",
  templateUrl: "./admin-quiz.component.html",
  styleUrl: "./admin-quiz.component.scss",
  imports: [
    ReactiveFormsModule,
    LayoutModule,
    AdminQuestionsComponent,
    FaIconComponent,
    NgIf,
    NgMultiSelectDropDownModule,
    FormsModule
  ],
  standalone: true
})
export class AdminQuizComponent implements OnDestroy {
  availableTags: string[] = [];
  public loadingQuizData: boolean = false;
  public loading: boolean = false;
  public quiz: Quiz = {id: "", thumbnailUrl: "", title: "", tags: [], questions: []};

  quizForm: FormGroup = new FormGroup({
    title: new FormControl("", [Validators.required]),
    thumbnailUrl: new FormControl(""),
    tags: new FormControl([])
  });

  dropdownSettings = {
    singleSelection: false,
    idField: "item",
    textField: "item",
    selectAllText: "Tout sélectionner",
    unSelectAllText: "Tout désélectionner",
    allowSearchFilter: true,
    searchPlaceholderText: "Rechercher des tags"
  };

  constructor(public quizService: QuizService, userService: UserService, private route: ActivatedRoute, private router: Router) {
    this.quizService.quiz$.subscribe(quiz => {
      if (quiz) {
        this.quiz = quiz;
        this.loadingQuizData = false;
      }
      this.quizForm.setValue({
        title: this.quiz?.title ?? "",
        thumbnailUrl: this.quiz?.thumbnailUrl ?? "",
        tags: quiz?.tags ?? []
      });
    });
    this.route.params.subscribe(params => {
      let quizId = params["quiz_id"];
      if (quizId) this.loadingQuizData = true;
      this.quizService.selectQuiz(quizId);
    });
    userService.hobbies$.subscribe(availableTags => {
      this.availableTags = availableTags;
    });
  }

  ngOnDestroy() {
    this.quizService.selectQuiz("");
  }

  save() {
    this.loading = true;
    if (!this.quizForm.valid) return;
    if (this.quiz.id) {
      this.quizService.updateQuiz(this.quiz.id, this.quizForm.value).then(() => this.loading = false);
      return;
    }
    this.quizService.addQuiz(this.quizForm.value).then(quiz => this.router.navigate([quiz.id], {relativeTo: this.route}).then());
  }

  delete() {
    this.quizService.deleteQuiz(this.quiz.id);
    this.router.navigate(["../.."], {relativeTo: this.route}).then();
  }

  addQuestion() {
    this.quiz.questions.push({} as Question);
  }

  protected readonly faAdd = faAdd;
  protected readonly faSave = faSave;
  protected readonly faTrash = faTrash;
}
