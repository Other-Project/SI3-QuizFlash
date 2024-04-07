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
  @Input() question?: Question;
  @Input() user?: Patient;
  @Input() finish: boolean = false;
  @Input() audioGain!: number;

  protected trueAnswer?: Answer;
  protected chosenAnswer?: Answer;
  protected questionResult: boolean = false;
  protected inactive: boolean = false;

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
    this.chosenAnswer = answer;
  }

  continueQuiz() {
    this.questionResult = false;
    this.nextQuestion.emit(this.chosenAnswer);
  }

  selectionPage() {
    this.returnSelectionPage.emit();
  }

  stopQuiz() {
    this.inactive = true;
  }
}
