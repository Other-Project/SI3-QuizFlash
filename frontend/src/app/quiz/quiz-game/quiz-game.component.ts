import {Component} from "@angular/core";
import {UserService} from "../../../service/user.service";
import {Patient} from "../../../models/patient.models";
import {Quiz} from "../../../models/quiz.models";
import {Question} from "../../../models/question.models";
import {Answer} from "../../../models/answer.models";
import {QuizService} from "../../../service/quiz-service.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Attempt} from "../../../models/attempt.model";

@Component({
  selector: 'app-quiz',
  templateUrl: "./quiz-game.component.html",
  styleUrls: ["./quiz-game.component.scss"]
})
export class QuizGameComponent {
  public user?: Patient;
  public quiz?: Quiz;
  protected counter: number = 1;
  protected currentQuestion?: Question;
  protected soundSetting: boolean = false;
  protected audioGain!: number;
  protected questions: Question[] = [];
  protected fiftyFiftyEnabled: boolean = true;
  protected statisticId?: String;
  protected start?: Date;
  protected questionResult: boolean = false;
  protected trueAnswer?: Answer;
  protected check: boolean = false;
  protected inactivity: boolean = false;
  protected hidenAnswers: Answer[] = [];
  protected questionStatsId?: string;

  constructor(private userService: UserService, private quizService: QuizService, private router: Router, private route: ActivatedRoute) {
    this.userService.user$.subscribe(user => this.user = user as Patient);
    this.quizService.quiz$.subscribe(quiz => {
      this.quiz = quiz;
      this.questions = quiz?.questions ?? [];
      this.counter = 1;
      this.nextQuestion();
    });
    this.quizService.quizStatId$.subscribe(id => {
      this.statisticId = id;
    });
    this.quizService.questionStatsId$.subscribe(id => {
      this.questionStatsId = id;
    });
  }

  update() {
    this.hidenAnswers = [];
    this.currentQuestion = this.questions.at(this.counter - 1);
    //if (this.currentQuestion) this.quizService.questionStatCreation(this.currentQuestion.id);
    this.questionResult = false;
    if (this.currentQuestion) this.quizService.nextQuestion(this.currentQuestion?.id, () => {
      this.startQuestion();
    });
  }

  startQuestion() {
    console.log(this.questionStatsId);
    this.start = new Date();
  }

  nextQuestion() {
    this.fiftyFiftyEnabled = true;
    this.check = false;
    this.update();
  }

  returnSelectionPage() {
    this.quizService.finish();
    this.router.navigate(["../.."], {relativeTo: this.route}).then();
  }

  isFinish() {
    return this.counter > this.questions.length;
  }

  getCounter() {
    if (this.isFinish()) return this.counter - 1;
    return this.counter;
  }

  checkAnswer(answer: Answer) {
    let duration = (new Date().getTime() - this.start!.getTime()) / 1000;
    let attempt = {} as Attempt;
    attempt.chosenAnswersId = answer.id;
    attempt.answerHint = !this.fiftyFiftyEnabled;
    attempt.timeSpent = duration;
    attempt.hiddenAnswers = this.currentQuestion!.answers.filter(answer => answer.hide == true).map(answer => answer.id);
    let trueAnswerId = this.quizService.chekAnswer(this.currentQuestion!.id, answer.id, attempt);
    this.check = trueAnswerId == answer.id;
    this.trueAnswer = this.currentQuestion!.answers.find(answer => answer.id == trueAnswerId);
    if (this.user!.removeAnswers && !this.check) {
      this.currentQuestion!.answers.find(a => answer == a)!.hide = true;
      this.start = new Date();
      return;
    } else if (this.user!.replayAtEnd && !this.check) this.replayAtEnd();
    //this.fiftyFiftyEnabled = false;
    this.counter++;
    this.questionResult = true;
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

  setInactivity() {
    this.inactivity = true;
  }
}
