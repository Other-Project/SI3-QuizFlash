import {Component, OnInit} from "@angular/core";
import {UserService} from "../../service/user.service";
import {User} from "../../models/user.models";
import {QuizListService} from "../../service/quiz-list-service.service";
import {ActivatedRoute} from "@angular/router";
import {Quiz} from "../../models/quiz.models";
import {Question} from "../../models/question.models";
import {Answer} from "../../models/answer.models";
import {QuestionType} from "../../models/question-type.models";

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent  implements OnInit{
  public user?: User;
  public quiz?: Quiz;
  protected counter: number = 0;
  protected headerActivated: boolean = true;
  protected currentQuestion?: Question;
  protected soundSetting: boolean = false;

  constructor(private route: ActivatedRoute, private userService: UserService, private quizService: QuizListService) {
    this.route.parent!.params.subscribe(params => {
      this.quizService.selectQuiz(params["quiz_id"]);
    });
    this.userService.user$.subscribe(user => {
      this.user = user;
      this.quizService.quiz$.subscribe(quiz => {
        this.quiz = quiz;
        if (quiz.questions.some(question => question.type == QuestionType.Sound) && this.user?.soundQuestion) this.soundSetting = true;
        this.update();
      });
    });
  }

  ngOnInit(): void {
  }

  update() {
    this.currentQuestion = this.quiz!.questions.at(this.counter);
  }

  nextQuestion(answerReturned: Answer) {
    if (this.counter)
      this.counter++;
    this.update();
  }
}
