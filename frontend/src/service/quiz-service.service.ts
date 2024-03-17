import {Injectable} from "@angular/core";
import {Quiz} from "../models/quiz.models";
import {QUIZ1} from "../mocks/quiz1.mock";
import {BehaviorSubject} from "rxjs";
import {QuizListService} from "./quiz-list-service.service";

@Injectable({providedIn:'root'})
export class QuizService{
  private quizList:Quiz[] = [];
  public quiz$:BehaviorSubject<Quiz>=new BehaviorSubject<Quiz>(QUIZ1);
  private quiz:Quiz = QUIZ1;
  constructor(public quizService:QuizListService) {
    this.quizService.quizz$.subscribe((quizz: Quiz[])=>{
      this.quizList = quizz;
    })
  }

  getQuiz(id:string){
    for (let i = 0; i < this.quizList.length; i++) {
      // @ts-ignore
      if(this.quizList.at(i).id == id){
        //@ts-ignore
        this.quiz = this.quizList.at(i);
        //@ts-ignore
        this.quiz$.next(this.quizList.at(i));
      }
    }
  }
}
