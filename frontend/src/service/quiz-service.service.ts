import {Injectable} from "@angular/core";
import {Quiz} from "../models/quiz.models";
import {QUIZLIST} from "../mocks/quiz-list.mock";
import {BehaviorSubject} from "rxjs";
import {User} from "../models/user.models";
import {UserService} from "./user.service";
import {QuestionType} from "../models/question-type.models";
import {Patient} from "../models/patient.models";

@Injectable({providedIn: "root"})
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

  selectQuiz(id: string, user?: Patient) {
    let copy = undefined;
    if (id) {
      let returnedQuiz = this.quizzes.find((quiz) => quiz.id == id);
      if (!returnedQuiz) console.error("No quiz found with ID " + id);

      if (user && (copy = structuredClone(returnedQuiz))) {
        if (!user.soundQuestion)
          copy.questions = copy.questions.filter(question => question.type != QuestionType.Sound);
        copy.questions = copy.questions.sort(() => 0.5 - Math.random()).slice(0, user.numberOfQuestion);
      } else copy = returnedQuiz;
    }
    this.quiz = copy;
    this.quiz$.next(this.quiz);
  }

  updateQuiz(quizId: string, updatedQuiz: Quiz) {
    let quizIndex = this.quizzes.findIndex(quiz => quiz.id == quizId);
    if (quizIndex < 0) return;
    this.quizzes[quizIndex] = Object.assign({}, this.quizzes[quizIndex], updatedQuiz);
  }

  addQuiz(quiz: Quiz) {
    quiz.id = this.idCreation();
    quiz.questions.forEach(question => question.id = this.idCreation());
    quiz.questions.forEach(question => question.answers.forEach(answer => answer.id = this.idCreation()));
    this.quizzes.push(quiz);
    this.quizzes$.next(this.quizzes);
    return quiz.id;
  }

  deleteQuiz(quizId: string): void {
    let quizIndex = this.quizzes.findIndex(quiz => quiz.id == quizId);
    this.quizzes.splice(quizIndex, 1);
    this.quizzes$.next(this.quizzes);
  }

  idCreation() {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
      (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
    );
  }
}
