import {Injectable} from "@angular/core";
import {Quiz} from "../models/quiz.models";
import {BehaviorSubject} from "rxjs";
import {Question} from "../models/question.models";
import {QuizService} from "./quiz-service.service";


@Injectable({providedIn: 'root'})
export class GameService {
  private quiz?: Quiz;

  private question?: Question;
  private counter?: number;
  public question$: BehaviorSubject<Question | undefined> = new BehaviorSubject<Question | undefined>(this.question);
  public compt$: BehaviorSubject<number | undefined> = new BehaviorSubject<number | undefined>(this.counter);

  constructor(public quizService: QuizService) {
    this.quizService.quiz$.subscribe((quiz) => {
      this.quiz = quiz;
      this.counter = quiz ? 1 : undefined;
      this.getQuestion();
    })
  }

  private getQuestion(): void {
    if (this.counter && this.quiz && this.counter > this.quiz.questions.length)
      this.quizService.endQuiz();
    else {
      this.question = this.counter ? this.quiz?.questions[this.counter - 1] : undefined
      this.compt$.next(this.counter);
      this.question$.next(this.question);
    }
  }

  nextQuestion(): void {
    if (this.counter) this.counter++;
    this.getQuestion()
  }

  previousQuestion(): void {
    if (this.counter) this.counter--;
    this.getQuestion()
  }

}
