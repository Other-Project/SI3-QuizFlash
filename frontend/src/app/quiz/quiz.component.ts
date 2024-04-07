import {Component, OnInit} from "@angular/core";
import {UserService} from "../../service/user.service";
import {Patient} from "../../models/patient.models";
import {Quiz} from "../../models/quiz.models";
import {Question} from "../../models/question.models";
import {Answer} from "../../models/answer.models";
import {QuestionType} from "../../models/question-type.models";

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  public user?: Patient;
  public quiz?: Quiz;
  protected counter: number = 1;
  protected currentQuestion?: Question;
  protected soundSetting: boolean = false;
  protected selection = true;
  protected playAtEnd: Question[] = [];
  protected numberOfQuestions: number = 0;
  protected notUsed: boolean = true;
  protected fiftyFiftyActivated: boolean = true;

  constructor(private userService: UserService) {
    this.userService.user$.subscribe(user => {
      this.user = user as Patient;
      if (this.user) this.numberOfQuestions = this.user.numberOfQuestion;
    });
  }

  ngOnInit(): void {
    this.currentQuestion?.answers.forEach(answer => answer.hide = false);
  }

  update() {
    if (this.counter - 1 >= this.quiz!.questions.length) {
      this.currentQuestion = this.playAtEnd.at(this.counter - 1 - this.quiz!.questions.length);
    } else this.currentQuestion = this.quiz!.questions.at(this.counter - 1);
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
    if (this.quiz.questions.length < this.numberOfQuestions) {
      this.numberOfQuestions = this.quiz.questions.length;
    }
    this.update();
    this.selection = false;
    this.currentQuestion?.answers.forEach(answer => answer.hide = false);
  }

  returnSelectionPage() {
    this.notUsed = true;
    this.numberOfQuestions = this.user!.numberOfQuestion;
    this.counter = 1;
    this.selection = true;
    this.quiz = undefined;
    this.currentQuestion = undefined;
    this.playAtEnd = [];
  }

  isFinish() { //TODO see if put a condition based on user attribute append to validate or not to replay at end the false questions
    return this.quiz?.questions.length! + this.playAtEnd.length < this.counter || this.counter - 1 >= this.user?.numberOfQuestion! + this.playAtEnd.length;
  }

  getCounter() {
    if (this.isFinish()) return this.counter - 1;
    return this.counter;
  }

  replayAtEnd() {
    if (!this.playAtEnd.find(question => question == this.currentQuestion)) {
      this.playAtEnd.push(this.currentQuestion!);
      this.numberOfQuestions = this.numberOfQuestions + 1;
    }
  }

  fiftyFifty() {
    if (this.notUsed && this.fiftyFiftyActivated) {
      this.notUsed = false;
      let falseAnswers = this.currentQuestion!.answers.filter(answer => !answer.trueAnswer);
      falseAnswers.sort(() => 0.5 - Math.random()).slice(0, Math.ceil(falseAnswers.length / 2)).forEach(answer => answer.hide = true);
      }
  }
}
