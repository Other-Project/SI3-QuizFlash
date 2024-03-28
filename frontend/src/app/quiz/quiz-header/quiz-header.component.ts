import {Component, Input} from "@angular/core";

@Component({
  selector: 'quiz-header',
  templateUrl: './quiz-header.component.html',
  styleUrls: ['./quiz-header.component.scss']
})
export class QuizHeaderComponent {

  @Input() counter?: number;
  @Input() quizTheme?: string;
  @Input() numberOfQuestion?: number;


  constructor() {
  }
}
