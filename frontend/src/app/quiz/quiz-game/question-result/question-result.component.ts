import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {Answer} from "../../../../models/answer.models";

@Component({
  selector: 'app-question-result',
  templateUrl: './question-result.component.html',
  styleUrls: ['./question-result.component.scss']
})
export class QuestionResultComponent implements OnInit {
  @Input() goodAnswer?: Answer;
  @Input() correct?: boolean;
  @Input() automatedSkip: boolean = false;
  @Output() continue = new EventEmitter<Answer>();
  private timeOutId?: number;

  constructor() {
  }

  ngOnInit(): void {
    if (this.automatedSkip) this.timeOutId = setTimeout(() => this.nextQuestion(), 60000);
  }

  nextQuestion() {
    this.continue.emit();
    clearTimeout(this.timeOutId);
  }
}
