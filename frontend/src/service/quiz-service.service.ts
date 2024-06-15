import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Quiz} from "../models/quiz.models";
import {BehaviorSubject, firstValueFrom} from "rxjs";
import {UserService} from "./user.service";
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
  private quizStatsId?: string;
  public quizStatId$: BehaviorSubject<string | undefined> = new BehaviorSubject<string | undefined>(this.quizStatsId);
  private questionStatsId?: string;
  public questionStatsId$: BehaviorSubject<string | undefined> = new BehaviorSubject<string | undefined>(this.questionStatsId);

  constructor(userService: UserService, private http: HttpClient) {
    userService.user$.subscribe(user => {
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
    let result = await firstValueFrom(this.http.get<{ quiz: Quiz, quizStatId: string }>(`${this.quizApiUrl}/${id}/startQuiz`, httpOptionsBase));
    this.quiz$.next(this.quiz = result.quiz);
    this.quizStatId$.next(this.quizStatsId = result.quizStatId);
    return result;
  }

  async nextQuestion(questionId: string) {
    let result = await firstValueFrom(this.http.get<string>(`${this.quizApiUrl}/${this.quizStatsId}/${questionId}/createQuestionStat`));
    this.questionStatsId$.next(this.questionStatsId = result);
    return result;
  }

  async checkAnswer(attempt: Attempt) {
    return await firstValueFrom(this.http.post<{
      isTrue: boolean,
      expected: { id: string, text: string } | undefined
    }>(`${this.quizApiUrl}/${this.quizStatsId}/${this.questionStatsId}/checkAnswer`, attempt, httpOptionsBase));
  }

  replaceQuiz(quizId: string, updatedQuiz: Quiz) {
    this.http.put<Quiz>(`${this.quizApiUrl}/${quizId}`, updatedQuiz, httpOptionsBase).subscribe(() => this.updateQuizList());
  }

  async addQuiz(quiz: Quiz) {
    let response = await firstValueFrom(this.http.post<Quiz>(this.quizApiUrl, quiz, httpOptionsBase));
    this.updateQuizList();
    return response;
  }

  deleteQuiz(quizId: string) {
    this.http.delete(`${this.quizApiUrl}/${quizId}`, httpOptionsBase).subscribe(() => this.updateQuizList());
  }

  fiftyFifty(questionId: String) {
    return firstValueFrom(this.http.get<Answer[]>(`${this.quizApiUrl}/${this.quiz!.id}/questions/${questionId}/halveAnswers`, httpOptionsBase));
  }
}


