import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {GameService} from "../../../service/game-service.service";
import {Question} from "../../../models/question.models";
import {Answer} from "../../../models/answer.models";


@Component({
  selector: 'app-quiz-section',
  templateUrl: './quiz-section.component.html',
  styleUrls: ['./quiz-section.component.scss']
})
export class QuizSectionComponent {
  protected question?:Question;
  protected questionResult: boolean = false;
  protected trueAnswer: string | undefined;

  constructor(private router: Router, private route: ActivatedRoute, public gameService: GameService) {
    this.gameService.question$.subscribe((question) => {
      this.question = question
    });
  }

  checkAnswer(answer: String): void {
    this.questionResult = true;
  }

  continueQuiz(){
    this.gameService.nextQuestion();
    this.questionResult = false;
    if (!this.question) //Open the finish page at the end of the quiz
      this.router.navigate(["../finish"], {relativeTo: this.route}).then(
        r => {
          if (!r) console.log("Quiz finish launch error")
        })
  }
}

