import {Component, EventEmitter, Input, Output} from "@angular/core";
import {Question} from "../../../../models/question.models";
import {Patient} from "../../../../models/patient.models";
import {Answer} from "../../../../models/answer.models";


@Component({
  selector: 'app-quiz-section',
  templateUrl: './quiz-section.component.html',
  styleUrls: ['./quiz-section.component.scss']
})
export class QuizSectionComponent {

  @Input() question?: Question;
  @Input() user?: Patient;
  @Input() audioGain!: number;
  @Output() inactive: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() chosenAnswer: EventEmitter<Answer> = new EventEmitter<Answer>();

  constructor() {
  }

  checkAnswer(answer: Answer): void {
    this.chosenAnswer.emit(answer);
  }

  setInactivity() {
    this.inactive.emit(true);
  }
}
