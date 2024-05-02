import {Injectable} from "@angular/core";
import {HISTORIC} from "../mocks/historic.mock";
import {BehaviorSubject} from "rxjs";
import {QuizStats} from "../models/quiz-stats.model";


@Injectable({providedIn: "root"})
export class HistoricService {
  public attempt_summary?: QuizStats;
  public attempt_summary$: BehaviorSubject<QuizStats | undefined> = new BehaviorSubject<QuizStats | undefined>(this.attempt_summary);

  constructor() {
  }

  public getUserQuizHistoric(quizId: string, userId: string, date: Date) {
    this.attempt_summary = HISTORIC.find(historic => historic.userId == userId)!.stats.find(historic => historic.quizId == quizId && historic.date == date);
    this.attempt_summary$.next(this.attempt_summary);
  }

  public getUserHistoric(userId: string) {
    return HISTORIC.find(historic => historic.userId == userId);
  }
}
