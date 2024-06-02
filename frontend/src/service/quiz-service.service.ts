import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Quiz} from "../models/quiz.models";
import {BehaviorSubject, firstValueFrom} from "rxjs";
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
    userService.user$.subscribe(user => {
      this.user = user;
      if (user) this.updateQuizList();
    });
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
    else this.quiz$.next(this.quiz = undefined);
  }

  async startQuiz(id?: string) {
    if (!id) {
      this.quiz$.next(this.quiz = undefined);
      this.quizStatId$.next(this.quizStatsId = undefined);
      return;
    }
    let params = new HttpParams();
    params = params.append("userId", this.user!.id);
    let result = await firstValueFrom(this.http.get<{ quiz: Quiz, quizStatId: string }>(`${this.quizApiUrl}/${id}/startQuiz`, {params}));
    this.quiz$.next(this.quiz = result.quiz);
    this.quizStatId$.next(this.quizStatsId = result.quizStatId);
    return result;
  }

  async nextQuestion(questionId: string) {
    let result = await firstValueFrom(this.http.get<string>(`${this.quizApiUrl}/${this.quizStatsId}/${questionId}/createQuestionStat`));
    this.questionStatsId$.next(this.questionStatsId = result);
    return result;
  }

  checkAnswer(attempt: Attempt, callback?: ((check: string) => void)) {
    this.http.post<string>(`${this.quizApiUrl}/${this.quizStatsId}/${this.questionStatsId}/${this.user!.id}/checkAnswer`, attempt, httpOptionsBase).subscribe(result => callback!(result));
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

  fiftyFifty(questionId: String) {
    return firstValueFrom(this.http.get<Answer[]>(`${this.quizApiUrl}/${this.quiz!.id}/questions/${questionId}/halveAnswers`, httpOptionsBase));
  }
}


