import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {Question} from "../../../models/question.models";
import {Patient} from "../../../models/patient.models";
import {Answer} from "../../../models/answer.models";


@Component({
  selector: 'app-quiz-section',
  templateUrl: './quiz-section.component.html',
  styleUrls: ['./quiz-section.component.scss']
})
export class QuizSectionComponent implements OnInit {
  @Input() set values(question: Question | undefined) {
    if (question) {
      this.question = question;
      this.trueAnswer = this.question?.answers.find(answer => answer.trueAnswer);
    }
  }

  protected question?: Question;
  @Input() user?: Patient;

  @Input() finish: boolean = false;
  protected inactive: boolean = false;
  protected trueAnswer?: Answer;
  protected chosenAnswer?: Answer;
  protected questionResult: boolean = false;
  protected correct: boolean[] = [true, true];

  protected finishPageTitle?: String;
  protected finishPageText?: String;
  protected finishPageTextButton?: String;

  @Output() nextQuestion: EventEmitter<Answer> = new EventEmitter<Answer>();
  @Output() returnSelectionPage: EventEmitter<undefined> = new EventEmitter<undefined>();
  @Output() replayAtTheEnd: EventEmitter<undefined> = new EventEmitter<undefined>();
  @Output() fiftyFiftyUsable: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {
  }

  ngOnInit(): void {
    if (this.user) {
      this.correct[1] = this.user.showIncorrectResponse;
    }
  }

  checkAnswer(answer: Answer): void {
    this.chosenAnswer = answer;
    if (this.user!.removeAnswers && answer != this.trueAnswer && this.question) {
      let question = this.question.answers.find(a => answer == a);
      question!.hide = true;
      return;
    }
    this.questionResult = true;
    if (this.user!.replayAtEnd && this.chosenAnswer != this.trueAnswer) {
        this.replayAtTheEnd.emit();
    }
    if (this.chosenAnswer != this.trueAnswer) this.correct[0] = false;
    this.fiftyFiftyUsable.emit(false);
  }

  continueQuiz() {
    this.question!.answers.forEach(answer => answer.hide = false);
    this.questionResult = false;
    this.nextQuestion.emit(this.chosenAnswer);
    this.correct[0] = true;
    this.fiftyFiftyUsable.emit(true);
  }

  selectionPage() {
    this.returnSelectionPage.emit();
  }
}
