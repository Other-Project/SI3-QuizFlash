import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {Answer} from "../../../../models/answer.models";

@Component({
  selector: 'answers-section',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.scss']
})
export class AnswersComponent implements OnInit {

  @Input() answers: Answer[] = [];
  @Input() automatedSkip: boolean = false;
  private timeOutId?: number;
  private start?: Date;
  @Output() inactive: EventEmitter<undefined> = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
    if (this.automatedSkip) this.timeOutId = setTimeout(() => this.stopQuiz(), 900000); //15 minutes
    this.start = new Date();
  }

  @Output() returnedAnswer = new EventEmitter<Answer>();

  returnAnswer(value: Answer) {
    clearTimeout(this.timeOutId);
    let end = new Date();
    let duration = (end.getTime() - this.start!.getTime()) / 1000;
    this.returnedAnswer.emit(value); //To return value to the quiz-section.component
  }

  stopQuiz() {
    this.inactive.emit();
  }
}
