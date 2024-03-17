import {Injectable} from "@angular/core";
import {Quiz} from "../models/quiz.models";
import {QUIZ1} from "../mocks/quiz1.mock";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {Question} from "../models/question.models";
import {QuizListService} from "./quiz-list-service.service";

@Injectable({providedIn:'root'})
export class QuizService{
  public quizList:Quiz[] = [];
  public quiz$:BehaviorSubject<Quiz>=new BehaviorSubject<Quiz>(QUIZ1);

  constructor(public quizService:QuizListService) {
    this.quizService.quizz$.subscribe((quizz: Quiz[])=>{
      console.log(quizz); this.quizList = quizz;
    })
  }

  getQuiz(id:string){
    for (let i = 0; i < this.quizList.length; i++) {
      // @ts-ignore
      if(this.quizList.at(i).id == id){
        //@ts-ignore
        this.quiz$.next(this.quizList.at(i));
      }
    }
  }
}
