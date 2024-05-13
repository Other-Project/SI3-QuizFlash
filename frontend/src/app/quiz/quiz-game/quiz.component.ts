import {Component, OnInit} from "@angular/core";
import {UserService} from "../../../service/user.service";
import {Patient} from "../../../models/patient.models";
import {Quiz} from "../../../models/quiz.models";
import {Question} from "../../../models/question.models";
import {Answer} from "../../../models/answer.models";
import {QuestionType} from "../../../models/question-type.models";
import {QuizService} from "../../../service/quiz-service.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  public user?: Patient;
  public quizzes?: Quiz[];
  public quiz?: Quiz;
  protected counter: number = 1;
  protected currentQuestion?: Question;
  protected soundSetting: boolean = false;
  protected selection = true;
  protected audioGain!: number;
  protected questions: Question[] = [];
  protected fiftyFiftyEnabled: boolean = true;

  constructor(private userService: UserService, private quizService: QuizService, private router: Router, private route: ActivatedRoute) {
    this.userService.user$.subscribe(user => {
      this.user = user as Patient;
    });
    quizService.quizzes$.subscribe(quizzes => this.quizzes = quizzes);
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
    this.fiftyFiftyEnabled = true;
    this.counter++;
    this.update();
  }

  returnSelectionPage() {
    this.quizService.selectQuiz("", this.user!);
    this.fiftyFiftyEnabled = true;
    this.counter = 1;
    this.selection = true;
    this.quiz = undefined;
    this.currentQuestion = undefined;
    this.questions = [];
    this.router.navigate([".."], {relativeTo: this.route}).then();
  }

  isFinish() {
    return this.counter > this.questions.length;
  }

  getCounter() {
    if (this.isFinish()) return this.counter - 1;
    return this.counter;
  }

  checkAnswer(answer: Answer) {
    if (this.user!.replayAtEnd && !answer.trueAnswer) this.replayAtEnd();
    this.fiftyFiftyEnabled = false;
  }

  replayAtEnd() {
    if (this.questions.filter(question => question == this.currentQuestion).length <= 1) {
      this.questions.push(this.currentQuestion!);
      this.questions.at(-1)!.answers.forEach(answer => answer.hide = false);
    }
  }

  fiftyFifty() {
    if (!this.fiftyFiftyEnabled) return;
    this.fiftyFiftyEnabled = false;
    let falseAnswers = this.currentQuestion!.answers.filter(answer => !answer.trueAnswer);
    falseAnswers.sort(() => 0.5 - Math.random()).slice(0, Math.ceil(falseAnswers.length / 2)).forEach(answer => answer.hide = true);
  }

  getGainToTransfer(event: number) {
    this.soundSetting = false;
    this.audioGain = event;
  }
}
