import {Injectable} from "@angular/core";
import {QuizStats} from "../models/quiz-stats.model";
import {BehaviorSubject} from "rxjs";
import {apiUrl} from "../configs/server.config";
import {Quiz} from "../models/quiz.models";
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable({providedIn: "root"})
export class StatisticsService {
  private readonly quizApiUrl = apiUrl + "/statistics";
  private graphData: { key: string, value: number }[] = [];
  private data?: any;
  private userQuizStats: QuizStats[] = [];
  graphData$: BehaviorSubject<{ key: string, value: number }[] | []> = new BehaviorSubject<{ key: string, value: number }[] | []>(this.graphData);
  data$: BehaviorSubject<any> = new BehaviorSubject(this.data);
  userQuizStats$: BehaviorSubject<QuizStats[]> = new BehaviorSubject<QuizStats[]>(this.userQuizStats);

  constructor(private http: HttpClient) {
  }

  getUserHistory(userId: string) {
    //this.userQuizStats = this.quizStatistics.filter(statistic => statistic.userId == userId);
    //this.userQuizStats$.next(this.userQuizStats);
  }

  //TODO
  getUserQuizzesParticipation(userId: number, callback: ((quizzes: Quiz[]) => void)) {
    this.http.get<Quiz[]>(`${this.quizApiUrl}/quizzes/${userId}`).subscribe(quizzes => {
      callback(quizzes);
    });
  }

  refreshUserStatistics(userId: string, dataType: string, statType: string, quizId?: string, questionType?: string) {
    let params = new HttpParams();
    if (quizId) params = params.append("quizId", quizId);
    if (questionType) params = params.append("questionType", questionType);
    this.http.get<{
      data: any,
      graphData: { key: string, value: number }[]
    }>(`${this.quizApiUrl}/${userId}/${dataType}/${statType}`, {params}).subscribe(object => {
      this.graphData$.next(object.graphData);
      this.data$.next(object.data);
    });
  }
}
