import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {GameService} from "../../../service/game-service.service";
import {Question} from "../../../models/question.models";


@Component({
  selector: 'app-quiz-section',
  templateUrl: './quiz-section.component.html',
  styleUrls: ['./quiz-section.component.scss']
})
export class QuizSectionComponent {
  protected question?: Question;

  constructor(private router: Router, private route: ActivatedRoute, public gameService: GameService) {
    this.gameService.question$.subscribe((question) => {
      this.question = question
    });
  }

  checkAnswer(answer: String): void {
    if (this.question?.trueAnswer == answer) //Open the intermediate page with good text depends on answer (if it is good or not)
      this.router.navigate(["../intermediate", true], {relativeTo: this.route}).then(
        r => {
          if (r) this.continueQuiz();
          else console.log("Quiz intermediate launch error")
        })
    else
      this.router.navigate(["../intermediate", false], {relativeTo: this.route}).then(
        r => {
          if (r) this.continueQuiz();
          else console.log("Quiz intermediate launch error")
        })
  }

  continueQuiz() {
    this.gameService.nextQuestion();
    if (!this.question) //Open the finish page at the end of the quiz
      this.router.navigate(["../finish"], {relativeTo: this.route}).then(
        r => {
          if (!r) console.log("Quiz finish launch error")
        })
  }
}
