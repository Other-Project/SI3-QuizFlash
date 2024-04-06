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

  @Input() set finish(value: boolean) {
    this.finishOrInactive = value;
    if (value) {
      this.finishPageTitle = "Bravo !";
      this.finishPageText = "Vous avez terminé";
      this.finishPageTextButton = "Revenir au menu";
    }
  };

  protected finishOrInactive: boolean = false;
  protected trueAnswer?: Answer;
  protected chosenAnswer?: Answer;
  protected questionResult: boolean = false;
  protected correct: boolean = true;

  protected finishPageTitle?: String;
  protected finishPageText?: String;
  protected finishPageTextButton?: String;

  @Output() nextQuestion: EventEmitter<Answer> = new EventEmitter<Answer>();
  @Output() returnSelectionPage: EventEmitter<undefined> = new EventEmitter<undefined>();

  constructor() {
    if (this.finish) {
      this.finishPageTitle = "Bravo !";
      this.finishPageText = "Vous avez terminé";
      this.finishPageTextButton = "Revenir au menu";
    }
  }

  ngOnInit(): void {
  }

  checkAnswer(answer: Answer): void {
    this.chosenAnswer = answer;
    console.log(answer, this.trueAnswer);
    if (!this.user!.showIncorrectResponse && answer != this.trueAnswer && this.question) {
      console.log(answer, this.trueAnswer);
      this.question.answers = this.question?.answers.filter(a => a != answer);
      console.log(this.question);
      return;
    }
    this.trueAnswer = this.question?.answers.find(answer => answer.trueAnswer);
    this.questionResult = true;
    if (!this.user!.automatedSkip) {
      if (this.chosenAnswer != this.trueAnswer) {
        this.correct = false;
        console.log("problème");
        //TODO remttre la question dans une liste pour la fin
      }
    }
  }

  continueQuiz() {
    this.questionResult = false;
    this.nextQuestion.emit(this.chosenAnswer);
    this.correct = true;
  }

  selectionPage() {
    this.returnSelectionPage.emit();
  }

  stopQuiz() {
    this.finishPageTitle = "Quiz terminé";
    this.finishPageText = "Le quiz a été clos automatiquement en raison d'une longue période d'inactivité.";
    this.finishPageTextButton = "Revenir au menu";
    this.finishOrInactive = true;
  }
}
