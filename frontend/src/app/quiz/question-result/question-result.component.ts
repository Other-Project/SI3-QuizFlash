import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Answer} from "../../../models/answer.models";

@Component({
  selector: 'app-question-result',
  templateUrl: './question-result.component.html',
  styleUrls: ['./question-result.component.scss']
})
export class QuestionResultComponent implements OnInit {
  @Input() goodAnswer: string | undefined;

  constructor() {
  }

  ngOnInit(): void {
  }

  @Output() continue = new EventEmitter<Answer>();

  nextQuestion() {
    this.continue.emit()
  }
}
