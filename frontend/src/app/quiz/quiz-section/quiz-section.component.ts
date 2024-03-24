import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {GameService} from "../../../service/game-service.service";
import {Question} from "../../../models/question.models";
import {UserService} from "../../../service/user.service";
import {User} from "../../../models/user.models";
import {QuestionType} from "../../../models/question-type.models";
import {Answer} from "../../../models/answer.models";


@Component({
  selector: 'app-quiz-section',
  templateUrl: './quiz-section.component.html',
  styleUrls: ['./quiz-section.component.scss']
})
export class QuizSectionComponent {
  protected question?: Question
  protected questionResult: boolean = false;
  protected trueAnswer?: string;
  protected user!: User;

  constructor(private router: Router, private route: ActivatedRoute, public gameService: GameService, public userService: UserService) {
    this.gameService.question$.subscribe((question) => {
      this.question = question;
      if (question)
        this.trueAnswer = question.answers.find(answer => answer.trueAnswer)?.answerText;
    });
    this.userService.user$.subscribe((user) => {
      this.user = user;
    })
  }

  checkAnswer(answer: Answer): void {
    if (this.user.automatedSkip) {
      this.continueQuiz();
    } else {
      this.questionResult = true;
    }
  }

  continueQuiz() {
    this.gameService.nextQuestion();
    if (!this.user.soundQuestion) {
      while (this.question?.type == QuestionType.Sound) this.gameService.nextQuestion();
    }
    this.questionResult = false;
    if (!this.question) //Open the finish page at the end of the quiz
      this.router.navigate(["../finish"], {relativeTo: this.route}).then(
        r => {
          if (!r) console.log("Quiz finish launch error")
        })
  }
}
