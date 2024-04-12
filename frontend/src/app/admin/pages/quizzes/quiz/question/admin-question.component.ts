import {Component, EventEmitter, Input, Output} from "@angular/core";
import {ReactiveFormsModule} from "@angular/forms";
import {LayoutModule} from "../../../../../layout/layout.module";
import {Question} from "../../../../../../models/question.models";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faQuestion, faReply} from "@fortawesome/free-solid-svg-icons";
import {NgForOf} from "@angular/common";

@Component({
  selector: "app-admin-question",
  templateUrl: "./admin-question.component.html",
  styleUrl: "./admin-question.component.scss",
  imports: [
    ReactiveFormsModule,
    LayoutModule,
    FaIconComponent,
    NgForOf
  ],
  standalone: true
})
export class AdminQuestionComponent {
  @Input() public question?: Question;
  @Output() public questionUpdated = new EventEmitter<Question>();

  constructor() {
  }


  protected readonly faQuestion = faQuestion;
  protected readonly faReply = faReply;
}
