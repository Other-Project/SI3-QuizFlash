import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {AbstractControl, FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {LayoutModule} from "../../../../../layout/layout.module";
import {Question} from "../../../../../../models/question.models";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faQuestion, faReply, faSave, faTrash} from "@fortawesome/free-solid-svg-icons";
import {DecimalPipe, KeyValuePipe, NgForOf, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault} from "@angular/common";
import {QuestionType} from "../../../../../../models/question-type.models";
import {PlayButtonComponent} from "../../../../../layout/play-button/play-button.component";
import {Answer} from "../../../../../../models/answer.models";
import {QuizService} from "../../../../../../service/quiz-service.service";
import {Scale} from "../../../../../layout/button/button.component";

@Component({
  selector: "app-admin-question",
  templateUrl: "./admin-question.component.html",
  styleUrl: "./admin-question.component.scss",
  imports: [
    ReactiveFormsModule,
    LayoutModule,
    FaIconComponent,
    NgForOf,
    KeyValuePipe,
    NgIf,
    NgSwitch,
    NgSwitchCase,
    NgSwitchDefault,
    DecimalPipe,
    FormsModule,
    PlayButtonComponent
  ],
  standalone: true
})
export class AdminQuestionComponent implements OnInit {
  @Input() public quizId!: string;
  @Input() public question!: Question;
  @Output() public questionRemoved = new EventEmitter<any>();
  @Output() public questionSaved = new EventEmitter<Question>();

  loading: boolean = false;
  form!: FormGroup;
  answers = new FormArray<FormGroup<{ id: FormControl, answerText: FormControl, trueAnswer: FormControl }>>([]);
  changed = false;

  constructor(private quizService: QuizService) {
  }

  ngOnInit() {
    if (!this.question.type) this.question.type = QuestionType.TextOnly;
    if (!this.question.answers) this.question.answers = [{trueAnswer: true} as Answer, {trueAnswer: false} as Answer];

    this.answers.clear();
    this.form = new FormGroup({
      text: new FormControl(this.question.text, [Validators.required]),
      type: new FormControl(this.question.type ?? QuestionType.TextOnly, [Validators.required]),
      imageUrl: new FormControl(this.question.imageUrl ?? "", this.question.type == QuestionType.Image ? Validators.required : undefined),
      soundUrl: new FormControl(this.question.soundUrl ?? "", this.question.type == QuestionType.Sound ? Validators.required : undefined),
      answers: this.answers
    });
    this.form.get("type")?.valueChanges.subscribe(type => {
      this.setRequired(this.form.get("imageUrl")!, type == QuestionType.Image);
      this.setRequired(this.form.get("soundUrl")!, type == QuestionType.Sound);
    });
    this.question.answers.forEach(answer => this.addAnswer(answer));
    this.form.valueChanges.subscribe(() => this.dataChanged());
  }

  private setRequired(control: AbstractControl, required: boolean = true) {
    if (required) control.addValidators(Validators.required);
    else control.removeValidators(Validators.required);
    control.updateValueAndValidity({emitEvent: false});
  }

  changeTrueAnswer(index: number) {
    this.answers.controls.forEach((answer, i) => answer.get("trueAnswer")?.setValue(i == index, {emitEvent: false}));
    this.answers.updateValueAndValidity();
  }

  addAnswer(answer?: Answer) {
    this.answers.push(new FormGroup({
      id: new FormControl(answer?.id),
      answerText: new FormControl(answer?.answerText, [Validators.required]),
      trueAnswer: new FormControl(answer?.trueAnswer ?? false, [Validators.required])
    }));
  }

  removeAnswer(index: number) {
    this.answers.removeAt(index);
  }

  dataChanged() {
    this.changed = this.form.valid;
  }

  save() {
    this.loading = true;
    if (!this.changed || !this.form.valid) return;
    (this.question.id
        ? this.quizService.updateQuestion(this.quizId, this.question.id, this.form.value)
        : this.quizService.addQuestion(this.quizId, this.form.value)
    ).then(resp => {
      this.questionSaved.emit(resp);
      this.changed = false;
      this.loading = false;
    });
  }

  protected readonly faQuestion = faQuestion;
  protected readonly faReply = faReply;
  protected readonly faTrash = faTrash;

  protected readonly QuestionType = QuestionType;
  protected readonly QuestionTypes = {
    [QuestionType.TextOnly]: "Textuelle",
    [QuestionType.Image]: "Visuelle",
    [QuestionType.Sound]: "Sonore"
  };
  protected readonly faSave = faSave;
  protected readonly Scale = Scale;
}
