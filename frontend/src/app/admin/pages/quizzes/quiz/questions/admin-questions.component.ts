import {Component, EventEmitter, Input, Output} from "@angular/core";
import {ReactiveFormsModule} from "@angular/forms";
import {LayoutModule} from "../../../../../layout/layout.module";
import {Question} from "../../../../../../models/question.models";
import {AdminQuestionComponent} from "../question/admin-question.component";
import {NgForOf} from "@angular/common";

@Component({
  selector: "app-admin-questions",
  templateUrl: "./admin-questions.component.html",
  styleUrl: "./admin-questions.component.scss",
  imports: [
    ReactiveFormsModule,
    LayoutModule,
    AdminQuestionComponent,
    NgForOf
  ],
  standalone: true
})
export class AdminQuestionsComponent {
  @Input() public questions?: Question[];
  @Output() public questionsUpdated = new EventEmitter<Question[]>();

  constructor() {
  }

  removeQuestion(index: number) {
    this.questions?.splice(index, 1);
  }
}
