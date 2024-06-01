import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Quiz} from "../models/quiz.models";
import {BehaviorSubject} from "rxjs";
import {User} from "../models/user.models";
import {UserService} from "./user.service";
import {StatisticsService} from "./statistics.service";
import {Attempt} from "../models/attempt.model";
import {apiUrl, httpOptionsBase} from "../configs/server.config";
import {Answer} from "../models/answer.models";

@Injectable({providedIn: "root"})
export class QuizService {
  private readonly quizApiUrl = apiUrl + "/quizzes";

  public quizzes: Quiz[] = [];
  public quizzes$: BehaviorSubject<Quiz[]> = new BehaviorSubject<Quiz[]>(this.quizzes);
  public quiz?: Quiz;
  public quiz$: BehaviorSubject<Quiz | undefined> = new BehaviorSubject<Quiz | undefined>(this.quiz);
  private user?: User;
  private quizStatsId?: string;
  public quizStatId$: BehaviorSubject<string | undefined> = new BehaviorSubject<string | undefined>(this.quizStatsId);
  private questionStatsId?: string;
  public questionStatsId$: BehaviorSubject<string | undefined> = new BehaviorSubject<string | undefined>(this.questionStatsId);

  constructor(userService: UserService, private statisticsService: StatisticsService, private http: HttpClient) {
    userService.user$.subscribe(user => this.user = user);
    this.updateQuizList();
  }

  updateQuizList() {
    this.http.get<Quiz[]>(this.quizApiUrl).subscribe(quizzes => {
      this.quizzes$.next(this.quizzes = quizzes);
    });
  }

  selectQuiz(id?: string) {
    if (id)
      this.http.get<Quiz>(`${this.quizApiUrl}/${id}`).subscribe(quiz => {
        this.quiz$.next(this.quiz = quiz);
      });
    else {
      this.quiz$.next(this.quiz = undefined);
    }
    console.log(this.quiz);
  }

  startQuiz(id?: string, callback?: (({}) => void)) {
    if (id)
      this.http.get<{ quiz: Quiz, quizStatId: string }>(`${this.quizApiUrl}/${id}/${this.user?.id}/startQuiz`).subscribe(values => {
        this.quiz$.next(this.quiz = values.quiz);
        this.quizStatId$.next(this.quizStatsId = values.quizStatId);
        callback!(values);
      });
    else {
      this.quiz$.next(this.quiz = undefined);
      this.quizStatId$.next(this.quizStatsId = undefined);
    }
  }

  nextQuestion(questionId?: string, callback?: ((id: string) => void)) {
    if (questionId) {
      this.http.get<string>(`${this.quizApiUrl}/${this.quizStatsId}/${questionId}/nextQuestion`).subscribe(id => {
        this.questionStatsId$.next(this.questionStatsId = id);
        callback!(id);
      });
    }
  }

  chekAnswer(attempt: Attempt, callback?: ((check: string) => void)) {
    console.log(this.questionStatsId + "ghbhbjjhjjbhjnhjn");
    if (attempt) {
      this.http.post<string>(this.quizApiUrl + "/" + this.questionStatsId + "/checkAnswer", attempt, httpOptionsBase).subscribe(result => callback!(result));
    }
  }

  replaceQuiz(quizId: string, updatedQuiz: Quiz) {
    this.http.put<Quiz>(`${this.quizApiUrl}/${quizId}`, updatedQuiz, httpOptionsBase).subscribe(() => this.updateQuizList());
  }

  addQuiz(quiz: Quiz, callback: ((quiz: Quiz) => void)) {
    this.http.post<Quiz>(this.quizApiUrl, quiz, httpOptionsBase).subscribe(quiz => callback(quiz));
  }

  deleteQuiz(quizId: string) {
    this.http.delete<Quiz>(`${this.quizApiUrl}/${quizId}`, httpOptionsBase).subscribe(() => {
      this.updateQuizList();
    });
  }

  fiftyFifty(questionId: String, n: number, callback: ((answers: Answer[]) => void)) {
    this.http.get<Answer[]>(`${this.quizApiUrl}/removedAnswer/${questionId}/${n}`, httpOptionsBase).subscribe(
      answers => callback(answers)
    );
  }
}


