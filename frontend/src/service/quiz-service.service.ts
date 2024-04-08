import {Injectable} from "@angular/core";
import {Quiz} from "../models/quiz.models";
import {QUIZLIST} from "../mocks/quiz-list.mock";
import {BehaviorSubject} from "rxjs";
import {User} from "../models/user.models";
import {UserService} from "./user.service";
import {QuestionType} from "../models/question-type.models";
import {Patient} from "../models/patient.models";

@Injectable({providedIn:'root'})
export class QuizService {
  public quizzes: Quiz[] = QUIZLIST;
  public quizzes$: BehaviorSubject<Quiz[]> = new BehaviorSubject<Quiz[]>(this.quizzes);
  public quiz?: Quiz;
  public quiz$: BehaviorSubject<Quiz | undefined> = new BehaviorSubject<Quiz | undefined>(this.quiz);
  private user?: User;

  constructor(private userService: UserService) {
    this.userService.user$.subscribe((user?: User) => {
      this.user = user;
    });
  }

  selectQuiz(id: string, user: Patient) {
    let copy = undefined;
    console.log(id);
    if (id) {
      let returnedQuiz = this.quizzes.find((quiz) => quiz.id == id);
      if (!returnedQuiz) console.error("No quiz found with ID " + id);
      copy = structuredClone(returnedQuiz);
      if (copy && !user.soundQuestion) {
        copy.questions = copy.questions.filter(question => question.type != QuestionType.Sound);
      }
      if (copy) {
        copy.questions = copy.questions.slice(0, user.numberOfQuestion);
      }
    }
    this.quiz = copy;
    this.quiz$.next(this.quiz);
  }

  addQuizzes(quiz: Quiz) {
    this.quizzes.push(quiz);
    this.quizzes$.next(this.quizzes);
  }

  deleteQuizzes(id: string): void {
  }
}
