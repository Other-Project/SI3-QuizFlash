import {Injectable} from "@angular/core";
import {Quiz} from "../models/quiz.models";
import {BehaviorSubject} from "rxjs";
import {QuizListService} from "./quiz-list-service.service";

@Injectable({providedIn: 'root'})
export class QuizService {
  private quizList: Quiz[] = [];
  private quiz?: Quiz;
  public quiz$: BehaviorSubject<Quiz | undefined> = new BehaviorSubject<Quiz | undefined>(this.quiz);

  constructor(public quizService: QuizListService) {
    this.quizService.quizz$.subscribe((quizz: Quiz[]) => {
      this.quizList = quizz;
    })
  }

  public setQuiz(id: string) {
    for (let quiz of this.quizList) {
      if (quiz.id == id) {
        this.quiz$.next(this.quiz = quiz);
      }
    }
  }

  endQuiz() {
    this.quiz$.next(this.quiz = undefined);
  }
}
