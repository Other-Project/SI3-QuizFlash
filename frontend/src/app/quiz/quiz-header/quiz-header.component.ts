import {Component} from '@angular/core';
import {GameService} from "../../../service/game-service.service";
import {ActivatedRoute} from "@angular/router";
import {QuizService} from "../../../service/quiz-service.service";
import {Quiz} from "../../../models/quiz.models";

@Component({
  selector: 'quiz-header',
  templateUrl: './quiz-header.component.html',
  styleUrls: ['./quiz-header.component.scss']
})
export class QuizHeaderComponent {

  public quiz?: Quiz;
  public questionCount?: number;

  constructor(private route: ActivatedRoute, public quizService: QuizService, public gameService: GameService) {
    quizService.quiz$.subscribe(quiz => {
      this.quiz = quiz;
    });
    gameService.compt$.subscribe(count => {
      this.questionCount = count;
    });

    this.route.params.subscribe(params => {
      quizService.setQuiz(params["quiz_id"]);
    });
  }
}
