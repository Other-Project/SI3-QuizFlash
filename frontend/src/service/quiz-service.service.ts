import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Quiz} from "../models/quiz.models";
import {BehaviorSubject} from "rxjs";
import {User} from "../models/user.models";
import {UserService} from "./user.service";
import {StatisticsService} from "./statistics.service";
import {QuizStats} from "../models/quiz-stats.model";
import {QuestionStats} from "../models/question-stats.model";
import {Attempt} from "../models/attempt.model";
import {apiUrl, httpOptionsBase} from "../configs/server.config";

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
  private quizStats?: QuizStats;
  private questionStatsId?: string;
  public questionStatsId$: BehaviorSubject<string | undefined> = new BehaviorSubject<string | undefined>(this.questionStatsId);

  constructor(userService: UserService, private statisticsService: StatisticsService, private http: HttpClient) {
    userService.user$.subscribe(user => this.user = user);
    this.updateQuizList();
  }

  updateQuizList() {
    //Todo différent en fonction user, ajout ou non des réponses
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

  idCreation() {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
      (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
    );
  }

  /*************
   * IN SERVER *
   *************/

  startQuiz2(quizId: string) {
    this.quizStats = {id: this.idCreation(), userId: this.user?.id, quizId: quizId, date: new Date(), questionsStats: []} as QuizStats;
    return this.quizStats.id;
  }

  questionStatCreation(questionId: string) {
    let questionStatistics = {
      questionId: questionId,
      questionType: this.quiz?.questions.find(question => question.id == questionId)!.type,
      success: false,
      attempts: []
    } as QuestionStats;
    this.quizStats!.questionsStats.push(questionStatistics);
  }

  chekAnswer(questionId: String, answerId: String, attempt: Attempt): string {
    let questionStat = this.quizStats?.questionsStats.find(question => question.questionId == questionId)!;
    questionStat.attempts.push(attempt);
    let goodAnswerId = this.quiz!.questions.find(question => question.id == questionId)!.answers.find(answer => answer.trueAnswer)!.id;
    if (goodAnswerId == answerId) questionStat.success = true;
    return goodAnswerId;
  }

  finish() {
    this.selectQuiz();
    this.statisticsService.quizStatistics.push(this.quizStats!);
  }
}


