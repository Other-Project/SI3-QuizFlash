import {Injectable} from "@angular/core";
import {Quiz} from "../models/quiz.models";
import {QUIZ1} from "../mocks/quiz1.mock";
import {BehaviorSubject} from "rxjs";
import {Question} from "../models/question.models";
import {QuestionType} from "../models/question-type.models";
import {QuizService} from "./quiz-service.service";


@Injectable({providedIn:'root'})
export class GameService{
  public question$:BehaviorSubject<Question> = new BehaviorSubject<Question>({
    falseAnswers: [],
    imageUrl: "",
    soundUrl: "",
    text: "",
    trueAnswer: "",
    type: QuestionType.TextOnly
  });
  private quiz:Quiz=QUIZ1;
  public compt$:BehaviorSubject<number> = new BehaviorSubject<number>(1);
  public theme$:BehaviorSubject<string> = new BehaviorSubject<string>("");

  constructor(public quizService:QuizService) {
    this.quizService.quiz$.subscribe((quiz: Quiz)=>{
      this.quiz = quiz;this.theme$.next(this.quiz.theme)
    })
  }

  getQuestion(): void {this.question$.next(this.quiz.questions[this.compt$.value-1])}
  nextQuestion(): void {this.compt$.next(this.compt$.value + 1);this.getQuestion()}
  previousQuestion(): void{this.compt$.next(this.compt$.value - 1);this.getQuestion()}

}
