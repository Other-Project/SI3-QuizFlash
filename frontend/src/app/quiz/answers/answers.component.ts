import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'answers-section',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.scss']
})
export class AnswersComponent implements OnInit{

  @Input() falseAnswer: string[] = [];
  @Input() trueAnswer: string = "";
  protected answers: string[] = [];

  constructor() {
  }

  ngOnInit(): void {
    this.answers = this.falseAnswer;
    if(this.answers.indexOf(this.trueAnswer) == -1)this.answers.push(this.trueAnswer);
  }

  @Output() returnedAnswer = new EventEmitter<string>();
  returnAnswer(value: string){
    this.returnedAnswer.emit(value); //To return value to the quiz-section.component
  }

}
