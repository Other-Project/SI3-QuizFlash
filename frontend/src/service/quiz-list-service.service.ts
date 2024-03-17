import {Injectable} from "@angular/core";
import {Quiz} from "../models/quiz.models";
import {QUIZLIST} from "../mocks/quiz-list.mock";
import {BehaviorSubject} from "rxjs";

@Injectable({providedIn:'root'})
export class QuizListService {
  public quizz$: BehaviorSubject<Quiz[]> = new BehaviorSubject<Quiz[]>(QUIZLIST);
  public quizz : Quiz[] = [];
  constructor() {}

  addQuizz(quiz : Quiz){
    this.quizz.push(quiz);
    this.quizz$.next(this.quizz)
  }
  deleteQuizz(id:string):void {}
}
