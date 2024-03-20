import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Answer} from "../../../models/answer.models";

@Component({
  selector: 'answers-section',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.scss']
})
export class AnswersComponent implements OnInit{

  @Input() answers: Answer[] = [];

  //protected answers: string[] = [];

  constructor() {
  }

  ngOnInit(): void {
  }

  @Output() returnedAnswer = new EventEmitter<Answer>();

  returnAnswer(value: Answer) {
    this.returnedAnswer.emit(value); //To return value to the quiz-section.component
  }
}
