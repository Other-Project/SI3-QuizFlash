import {Component, EventEmitter, Input, Output} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LayoutModule} from "../../../../../layout/layout.module";
import {Question} from "../../../../../../models/question.models";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faQuestion, faReply, faTrash} from "@fortawesome/free-solid-svg-icons";
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
export class AdminQuestionComponent {
  @Input() public question!: Question;
  @Output() public questionRemoved = new EventEmitter<any>();
  private static instance = 0;
  instance = AdminQuestionComponent.instance++;

  constructor() {
  }

  changeTrueAnswer(index: number) {
    this.question.answers.forEach((answer, i) => answer.trueAnswer = i == index);
  }

  addAnswer() {
    this.question.answers.push({trueAnswer: false} as Answer);
  }

  removeAnswer(index: number) {
    this.question.answers.splice(index, 1);
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
  protected readonly Number = Number;
}
