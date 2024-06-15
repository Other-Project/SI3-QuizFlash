import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {LayoutModule} from "../../../../../layout/layout.module";
import {Question} from "../../../../../../models/question.models";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faQuestion, faReply, faSave, faTrash} from "@fortawesome/free-solid-svg-icons";
import {DecimalPipe, KeyValuePipe, NgForOf, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault} from "@angular/common";
import {QuestionType} from "../../../../../../models/question-type.models";
import {PlayButtonComponent} from "../../../../../layout/play-button/play-button.component";
import {Answer} from "../../../../../../models/answer.models";

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
  @Input() public question!: Question;
  @Output() public questionRemoved = new EventEmitter<any>();
  @Output() public questionSaved = new EventEmitter<Question>();

  form!: FormGroup;
  changed = false;

  ngOnInit() {
    if (!this.question.type) this.question.type = QuestionType.TextOnly;
    if (!this.question.answers) this.question.answers = [{trueAnswer: false} as Answer, {trueAnswer: false} as Answer];

    this.form = new FormGroup({
      text: new FormControl(this.question.text, [Validators.required]),
      type: new FormControl(this.question.type ?? QuestionType.TextOnly, [Validators.required]),
      imageUrl: new FormControl(this.question.imageUrl ?? ""),
      soundUrl: new FormControl(this.question.soundUrl ?? ""),
      answers: new FormArray(this.question.answers.map(answer => new FormGroup({
        answerText: new FormControl(answer.answerText, [Validators.required]),
        trueAnswer: new FormControl(answer.trueAnswer ?? false, [Validators.required])
      })))
    });
    this.form.valueChanges.subscribe(() => this.changed = this.form.valid);
  }

  constructor() {
  }

  changeTrueAnswer(index: number) {
    this.question.answers.forEach((answer, i) => answer.trueAnswer = i == index);
    this.changed = this.form.valid;
  }

  addAnswer() {
    this.question.answers.push({trueAnswer: false} as Answer);
    this.changed = this.form.valid;
  }

  removeAnswer(index: number) {
    this.question.answers.splice(index, 1);
    this.changed = this.form.valid;
  }

  save() {
    if (!this.changed || !this.form.valid) return;
    this.questionSaved.emit(this.form.value);
    this.changed = false;
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
}
