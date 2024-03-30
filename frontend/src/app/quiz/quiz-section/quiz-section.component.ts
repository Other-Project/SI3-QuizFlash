import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {Question} from "../../../models/question.models";
import {User} from "../../../models/user.models";
import {Answer} from "../../../models/answer.models";


@Component({
  selector: 'app-quiz-section',
  templateUrl: './quiz-section.component.html',
  styleUrls: ['./quiz-section.component.scss']
})
export class QuizSectionComponent implements OnInit {
  @Input() question?: Question;
  @Input() user?: User;
  @Input() finish: boolean = false;

  protected trueAnswer?: Answer;
  protected answerChoose?: Answer;
  protected questionResult: boolean = false;

  @Output() nextQuestion: EventEmitter<Answer> = new EventEmitter<Answer>();
  @Output() returnSelectionPage: EventEmitter<undefined> = new EventEmitter<undefined>();

  constructor() {
  }

  ngOnInit(): void {
    this.trueAnswer = this.question?.answers.find(answer => answer.trueAnswer);
  }

  checkAnswer(answer: Answer): void {
    this.trueAnswer = this.question?.answers.find(answer => answer.trueAnswer);
    if (this.user!.automatedSkip) this.continueQuiz();
    else this.questionResult = true;
    this.answerChoose = answer;
  }

  continueQuiz() {
    this.questionResult = false;
    this.nextQuestion.emit(this.answerChoose);
  }

  selectionPage() {
    this.returnSelectionPage.emit();
  }
}
