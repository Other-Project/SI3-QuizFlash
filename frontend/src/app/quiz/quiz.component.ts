import {Component, OnInit} from "@angular/core";
import {UserService} from "../../service/user.service";
import {Patient} from "../../models/patient.models";
import {Quiz} from "../../models/quiz.models";
import {Question} from "../../models/question.models";
import {Answer} from "../../models/answer.models";
import {QuestionType} from "../../models/question-type.models";
import {QuizService} from "../../service/quiz-service.service";

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
  protected questions: Question[] = [];
  protected fiftyFiftyNotUse: boolean = true;
  protected fiftyFiftyActivated: boolean = true;

  constructor(private userService: UserService, private quizService: QuizService) {
    this.userService.user$.subscribe(user => {
      this.user = user as Patient;
    });
    this.quizService.quiz$.subscribe(quiz => {
      this.quiz = quiz;
      if (quiz) {
        this.questions = quiz.questions;
        if (this.user?.soundQuestion && this.questions.some(question => question.type == QuestionType.Sound)) this.soundSetting = true;
        this.update();
        this.selection = false;
      }
    });
  }

  ngOnInit(): void {
  }

  update() {
    this.currentQuestion = this.questions.at(this.counter - 1);
  }

  nextQuestion() {
    this.fiftyFiftyActivated = true;
    this.counter++;
    this.update();
  }

  setQuiz(quiz: Quiz) {
    this.quizService.selectQuiz(quiz.id, this.user!);
  }

  returnSelectionPage() {
    this.fiftyFiftyNotUse = true;
    this.counter = 1;
    this.selection = true;
    this.quiz = undefined;
    this.currentQuestion = undefined;
    this.questions = [];
  }

  isFinish() { //TODO see if put a condition based on user attribute append to validate or not to replay at end the false questions
    return this.questions.length < this.counter || this.counter - 1 >= this.questions.length;
  }

  getCounter() {
    if (this.isFinish()) return this.counter - 1;
    return this.counter;
  }

  checkAnswer(answer: Answer) {
    let trueAnswer = this.currentQuestion!.answers.find(answer => answer.trueAnswer);
    if (this.user!.replayAtEnd && answer != trueAnswer) {
      this.replayAtEnd();
    }
    this.fiftyFiftyActivated = false;
  }

  replayAtEnd() {
    if (this.questions.filter(question => question == this.currentQuestion).length <= 1) {
      this.questions.push(this.currentQuestion!);
      this.questions.at(-1)!.answers.forEach(answer => answer.hide = false);
    }
  }

  fiftyFifty() {
    if (this.fiftyFiftyActivated && this.fiftyFiftyNotUse) {
      this.fiftyFiftyNotUse = false;
      let falseAnswers = this.currentQuestion!.answers.filter(answer => !answer.trueAnswer);
      falseAnswers.sort(() => 0.5 - Math.random()).slice(0, Math.ceil(falseAnswers.length / 2)).forEach(answer => answer.hide = true);
      }
  }
}
