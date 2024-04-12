import {Component, EventEmitter, Input, Output} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LayoutModule} from "../../../../../layout/layout.module";
import {Question} from "../../../../../../models/question.models";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faQuestion, faReply, faTrash} from "@fortawesome/free-solid-svg-icons";
import {DecimalPipe, KeyValuePipe, NgForOf, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault} from "@angular/common";
import {QuestionType} from "../../../../../../models/question-type.models";

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
    FormsModule
  ],
  standalone: true
})
export class AdminQuestionComponent {
  @Input() public question!: Question;
  @Output() public questionChange = new EventEmitter<Question>();
  @Output() public questionRemoved = new EventEmitter<any>();

  constructor() {
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
