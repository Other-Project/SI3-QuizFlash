import {Injectable} from "@angular/core";
import {Quiz} from "../models/quiz.models";
import {QUIZLIST} from "../mocks/quiz-list.mock";
import {BehaviorSubject} from "rxjs";
import {User} from "../models/user.models";
import {QuestionType} from "../models/question-type.models";
import {UserService} from "./user.service";
import {QUIZ1} from "../mocks/quiz1.mock";

@Injectable({providedIn:'root'})
export class QuizListService {
  public quizzes: Quiz[] = QUIZLIST;
  public quizzes$: BehaviorSubject<Quiz[]> = new BehaviorSubject<Quiz[]>(this.quizzes);
  public quiz: Quiz = QUIZ1;
  public quiz$: BehaviorSubject<Quiz> = new BehaviorSubject<Quiz>(this.quiz);
  private user?: User;

  constructor(private userService: UserService) {
    this.userService.user$.subscribe((user?: User) => {
      this.user = user;
    });
  }

  selectQuiz(id: string) {
    let returnedQuiz = this.quizzes.find((quiz) => quiz.id == id);
    if (!returnedQuiz) return;
    if (!this.user!.soundQuestion) returnedQuiz.questions.filter((question) => question.type != QuestionType.Sound);
    this.quiz = returnedQuiz;
    this.quiz$.next(this.quiz);
  }

  addQuizzes(quiz: Quiz) {
    this.quizzes.push(quiz);
    this.quizzes$.next(this.quizzes);
  }

  deleteQuizzes(id: string): void {
  }
}
