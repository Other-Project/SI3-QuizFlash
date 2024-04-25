import {Injectable} from "@angular/core";
import {UserService} from "./user.service";
import {HISTORIC} from "../mocks/historic.mock";


@Injectable({providedIn: "root"})
export class HistoricService {

  constructor(private userService: UserService) {

  }

  public getUserQuizHistoric(quizId: string, userId: string, date: Date) {
    return HISTORIC.find(historic => historic.userId == userId)!.stats.find(historic => historic[0].quizId == quizId && historic[1] == date);
  }

  public getUserHistoric(userId: string) {
    return HISTORIC.find(historic => historic.userId == userId);
  }
}
