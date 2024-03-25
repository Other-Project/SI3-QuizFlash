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
  //protected quiz?: Quiz;
  protected questionResult: boolean = false;
  @Input() user?: User;
  protected trueAnswer?: Answer;
  @Input() finish: boolean = false;
  @Output() nextQuestion = new EventEmitter<Answer>();

  constructor() {
  }

  ngOnInit(): void {
    console.log(this.user);
    this.trueAnswer = this.question?.answers.find(answer => answer.trueAnswer);
  }

  checkAnswer(answer: Answer): void {
    if (this.user!.automatedSkip) {
      this.continueQuiz();
    } else {
      this.questionResult = true;
    }
    this.nextQuestion.emit(answer);
  }

  continueQuiz() {
    this.questionResult = false;
  }
}
