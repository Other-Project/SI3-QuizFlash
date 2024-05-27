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
import {Answer} from "../../../../../models/answer.models";
import {QuestionType} from "../../../../../models/question-type.models";
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
      if (quiz) this.quiz = quiz;
      this.quizForm.setValue({
        title: this.quiz?.title ?? "",
        thumbnailUrl: this.quiz?.thumbnailUrl ?? "",
        tags: quiz?.tags ?? []
      });
    });
    this.route.params.subscribe(params => {
      let id = params["quiz_id"];
      this.quizService.selectQuiz(id);
    });
    userService.hobbies$.subscribe(availableTags => {
      this.availableTags = availableTags;
    });
  }

  ngOnDestroy() {
    this.quizService.selectQuiz("");
  }

  save() {
    if (this.quizForm.valid) {
      let quiz = Object.assign({}, this.quiz, this.quizForm.value);
      if (this.quiz.id) return this.quizService.replaceQuiz(this.quiz.id, quiz);
      this.quizService.addQuiz(quiz, quiz => this.router.navigate([quiz.id], {relativeTo: this.route}).then());
    }
  }

  delete() {
    this.quizService.deleteQuiz(this.quiz.id);
    this.router.navigate(["../.."], {relativeTo: this.route}).then();
  }

  addQuestion() {
    this.quiz.questions.push({
      answers: [{} as Answer, {} as Answer],
      type: QuestionType.TextOnly
    } as Question);
  }

  protected readonly faAdd = faAdd;
  protected readonly faSave = faSave;
  protected readonly faTrash = faTrash;
}
