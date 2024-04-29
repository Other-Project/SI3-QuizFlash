import {Injectable} from "@angular/core";
import {UserService} from "./user.service";
import {HISTORIC} from "../mocks/historic.mock";
import {BehaviorSubject} from "rxjs";
import {QuizStats} from "../models/quiz-stats.model";


@Injectable({providedIn: "root"})
export class HistoricService {
  public attempt_summary?: [QuizStats, Date];
  public attempt_summary$: BehaviorSubject<[QuizStats, Date] | undefined> = new BehaviorSubject<[QuizStats, Date] | undefined>(this.attempt_summary);

  constructor(private userService: UserService) {

  }

  public getUserQuizHistoric(quizId: string, userId: string, date: Date) {
    this.attempt_summary = HISTORIC.find(historic => historic.userId == userId)!.stats.find(historic => historic[0].quizId == quizId && historic[1] == date);
    this.attempt_summary$.next(this.attempt_summary);
  }

  public getUserHistoric(userId: string) {
    return HISTORIC.find(historic => historic.userId == userId);
  }
}
