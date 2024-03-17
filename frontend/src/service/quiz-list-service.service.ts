import {Injectable} from "@angular/core";
import {Quiz} from "../models/quiz.models";
import {QUIZLIST} from "../mocks/quiz-list.mock";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";

@Injectable({providedIn:'root'})
export class QuizListService {
  public quizz$: BehaviorSubject<Quiz[]> = new BehaviorSubject<Quiz[]>(QUIZLIST);
  constructor() { }

  addQuizz(){}
  deleteQuizz(id:string):void {}
  getQuiz(id:string):void{}
  modifyQuizz(id:string): void {}
}
