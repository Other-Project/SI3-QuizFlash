import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {Answer} from "../../../models/answer.models";

@Component({
  selector: 'answers-section',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.scss']
})
export class AnswersComponent implements OnInit {

  @Input() answers: Answer[] = [];
  protected timeOutId: number | undefined;
  @Output() dontPlay: EventEmitter<undefined> = new EventEmitter();
  protected start: Date | undefined;
  protected end: Date | undefined;
  protected duration: number = 0;

  constructor() {
  }

  ngOnInit(): void {
    this.timeOutId = setTimeout(() => this.stopQuiz(), 900000);
    this.start = new Date();
  }

  @Output() returnedAnswer = new EventEmitter<Answer>();

  returnAnswer(value: Answer) {
    this.end = new Date();
    this.duration = (this.end.getTime() - this.start!.getTime()) / 1000;
    //console.log(this.duration)
    this.returnedAnswer.emit(value); //To return value to the quiz-section.component
  }

  stopQuiz() {
    this.dontPlay.emit();
  }
}
