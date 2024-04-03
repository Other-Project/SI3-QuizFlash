import {Component, OnInit} from "@angular/core";
import {UserService} from "../../service/user.service";
import {User} from "../../models/user.models";
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
  protected counter: number = 1;
  protected currentQuestion?: Question;
  protected soundSetting: boolean = false;
  protected selection = true;

  constructor(private userService: UserService) {
    this.userService.user$.subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit(): void {
  }

  update() {
    this.currentQuestion = this.quiz!.questions.at(this.counter - 1);
  }

  nextQuestion(answerReturned: Answer) {
    this.counter++;
    this.update();
  }

  setQuiz(quiz: Quiz) {
    this.quiz = quiz;
    if (this.user?.soundQuestion && quiz.questions.some(question => question.type == QuestionType.Sound)) this.soundSetting = true;
    else if (!this.user?.soundQuestion) {
      quiz.questions = quiz.questions.filter(question => question.type != QuestionType.Sound);
    }
    this.update();
    this.selection = false;
  }

  returnSelectionPage() {
    this.counter = 1;
    this.selection = true;
  }

  isFinish() {
    return this.quiz?.questions.length! < this.counter || this.counter - 1 >= this.user?.numberOfQuestion!;
  }

  getCounter() {
    if (this.isFinish()) return this.counter - 1;
    return this.counter;
  }
}
