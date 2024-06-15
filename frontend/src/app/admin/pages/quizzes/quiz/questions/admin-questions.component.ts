import {Component, Input} from "@angular/core";
import {ReactiveFormsModule} from "@angular/forms";
import {LayoutModule} from "../../../../../layout/layout.module";
import {Question} from "../../../../../../models/question.models";
import {AdminQuestionComponent} from "../question/admin-question.component";
import {NgForOf} from "@angular/common";
import {QuizService} from "../../../../../../service/quiz-service.service";

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
  @Input() public quizId!: string;

  constructor(public quizService: QuizService) {
  }

  removeQuestion(questionId: string, index: number) {
    if (questionId) this.quizService.deleteQuestion(this.quizId, questionId).then();
    else this.questions?.splice(index, 1);
  }

  saveQuestion(questionId: string, question: Question) {
    if (questionId) this.quizService.updateQuestion(this.quizId, questionId, question).then();
    else this.quizService.addQuestion(this.quizId, question).then();
  }
}
