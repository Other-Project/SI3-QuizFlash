import {Component, OnDestroy} from "@angular/core";
import {UserService} from "../../../service/user.service";
import {Patient} from "../../../models/patient.models";
import {Quiz} from "../../../models/quiz.models";
import {Question} from "../../../models/question.models";
import {Answer} from "../../../models/answer.models";
import {QuizService} from "../../../service/quiz-service.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Attempt} from "../../../models/attempt.model";
import {Subscription} from "rxjs";
import {QuestionType} from "../../../models/question-type.models";

@Component({
  selector: 'app-quiz',
  templateUrl: "./quiz-game.component.html",
  styleUrls: ["./quiz-game.component.scss"]
})
export class QuizGameComponent implements OnDestroy {
  public user?: Patient;
  public quiz?: Quiz;
  protected counter: number = 1;
  protected currentQuestion?: Question;
  protected soundSetting: boolean = false;
  protected audioGain!: number;
  protected questions: Question[] = [];
  protected fiftyFiftyEnabled: boolean = true;
  protected statisticId?: string;
  protected start?: Date;
  protected questionResult: boolean = false;
  protected trueAnswerText?: string;
  protected check: boolean = false;
  protected inactivity: boolean = false;
  protected questionStatsId?: string;
  protected finishPage: boolean = false;
  protected subscribeQuizStatsId: Subscription;
  protected loading: boolean = false;
  protected textLoading?: string;
  protected loadingFiftyFifty: boolean = false;

  constructor(private userService: UserService, private quizService: QuizService, private router: Router, private route: ActivatedRoute) {
    this.userService.user$.subscribe(user => this.user = user as Patient);
    this.quizService.quiz$.subscribe(quiz => {
      this.quiz = quiz;
      this.questions = quiz?.questions ?? [];
      if (this.questions.some(question => question.type == QuestionType.Sound)) this.soundSetting = true;
      this.counter = 1;
    });
    this.subscribeQuizStatsId = this.quizService.quizStatId$.subscribe(id => {
      this.statisticId = id;
      this.update();
    });
    this.quizService.questionStatsId$.subscribe(id => this.questionStatsId = id);
  }

  ngOnDestroy(): void {
    this.subscribeQuizStatsId.unsubscribe();
  }

  update() {
    this.currentQuestion = this.questions.at(this.counter - 1);
    if (this.isFinish()) {
      this.finishPage = true;
      return;
    }
    this.questionResult = false;
    if (this.currentQuestion) {
      this.loading = true;
      this.textLoading = "Passage à la question suivante en cours";
      this.quizService.nextQuestion(this.currentQuestion!.id).then(() => {
        this.startQuestion();
      }).catch(() => {
        alert("Il y a eu une erreur lors du passage à la question suivante.\nVeuillez recommencer le quiz");
      }).finally(() => this.loading = false);
    }
  }

  startQuestion() {
    this.start = new Date();
    if (this.currentQuestion!.answers.length <= 2) this.fiftyFiftyEnabled = false;
  }

  nextQuestion() {
    this.fiftyFiftyEnabled = true;
    this.check = false;
    this.update();
  }

  returnSelectionPage() {
    this.quizService.selectQuiz();
    this.router.navigate(["../.."], {relativeTo: this.route}).then();
  }

  isFinish() {
    return this.counter > this.questions.length;
  }

  getCounter() {
    if (this.isFinish()) return this.counter - 1;
    return this.counter;
  }

  result(answer: Answer, text?: string) {
    this.start = new Date();
    if (text == "") {
      this.currentQuestion!.answers.find(a => answer == a)!.hide = true;
      return;
    }
    this.trueAnswerText = text;
    if (this.user!.replayAtEnd && !this.check) this.replayAtEnd();
    this.counter++;
    this.questionResult = true;
  }

  checkAnswer(answer: Answer) {
    let duration = (new Date().getTime() - this.start!.getTime()) / 60000;
    let attempt = {} as Attempt;
    attempt.chosenAnswersId = answer.id;
    attempt.answerHint = !this.fiftyFiftyEnabled && this.currentQuestion!.answers.length > 2;
    attempt.timeSpent = duration;
    attempt.hiddenAnswers = this.currentQuestion!.answers.filter(answer => answer.hide == true).map(answer => answer.id);
    this.loading = true;
    this.textLoading = "Vérification de la réponse";
    this.quizService.checkAnswer(attempt).then((result => {
      this.check = result.isTrue;
      this.result(answer, result.expected?.text ?? "");
    })).catch(() => {
      alert("Il y a eu une erreur lors de la vérification de la réponse.\nVeuillez recommencer le quiz");
    }).finally(() => this.loading = false);
  }

  replayAtEnd() {
    if (this.questions.filter(question => question == this.currentQuestion).length <= 1) {
      this.questions.push(this.currentQuestion!);
      this.questions.at(-1)!.answers.forEach(answer => answer.hide = false);
    }
  }

  fiftyFifty() {
    this.loadingFiftyFifty = true;
    if (!this.fiftyFiftyEnabled) return;
    if (this.currentQuestion && this.currentQuestion.answers.length > 2) this.quizService.fiftyFifty(this.currentQuestion.id!).then(answers => {
      this.hideAnswers(answers);
      this.fiftyFiftyEnabled = false;
    }).catch(() => alert("Il y a eu un problème avec le 50/50 essayez de le réutiliser")).finally(() => this.loadingFiftyFifty = false);
  }

  hideAnswers(answers: Answer[]) {
    answers.forEach(answer2 => this.currentQuestion!.answers.find(answer => answer.id == answer2.id)!.hide = true);
  }

  getGainToTransfer(event: number) {
    this.soundSetting = false;
    this.audioGain = event;
  }

  setInactivity() {
    this.inactivity = true;
  }
}
