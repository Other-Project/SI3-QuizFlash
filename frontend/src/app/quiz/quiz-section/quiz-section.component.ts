import {Component, EventEmitter, Input, Output} from "@angular/core";
import {Question} from "../../../models/question.models";
import {Patient} from "../../../models/patient.models";
import {Answer} from "../../../models/answer.models";


@Component({
  selector: 'app-quiz-section',
  templateUrl: './quiz-section.component.html',
  styleUrls: ['./quiz-section.component.scss']
})
export class QuizSectionComponent {
  @Input() set values(question: Question | undefined) {
    this.question = question;
    if (question) this.trueAnswer = this.question?.answers.find(answer => answer.trueAnswer);
  }

  protected question?: Question;
  @Input() user?: Patient;

  @Input() finish: boolean = false;
  @Input() audioGain!: number;

  protected inactive: boolean = false;
  protected trueAnswer?: Answer;
  protected questionResult: boolean = false;
  protected correct: boolean = true;

  @Output() nextQuestion: EventEmitter<Answer> = new EventEmitter<Answer>();
  @Output() returnSelectionPage: EventEmitter<undefined> = new EventEmitter<undefined>();
  @Output() chosenAnswer: EventEmitter<Answer> = new EventEmitter<Answer>();

  constructor() {
  }

  checkAnswer(answer: Answer): void {
    if (this.user!.removeAnswers && !answer.trueAnswer && this.question) {
      this.question.answers.find(a => answer == a)!.hide = true;
      return;
    }
    this.questionResult = true;
    if (answer != this.trueAnswer) this.correct = false;
    this.chosenAnswer.emit(answer);
  }

  continueQuiz() {
    this.question!.answers.forEach(answer => answer.hide = false);
    this.questionResult = false;
    this.nextQuestion.emit();
    this.correct = true;
  }

  selectionPage() {
    this.returnSelectionPage.emit();
  }
}
