import {Component, Input, OnInit} from "@angular/core";
import {Patient} from "../../../../../models/patient.models";
import {QuizStats} from "../../../../../models/quiz-stats.model";
import {Quiz} from "../../../../../models/quiz.models";
import {QuizService} from "../../../../../service/quiz-service.service";
import {DatePipe} from "@angular/common";
import {StatisticsService} from "../../../../../service/statistics.service";

@Component({
  selector: "history",
  templateUrl: "history.component.html",
  styleUrls: ["history.component.scss"]
})

export class HistoryComponent implements OnInit {
  protected historic?: QuizStats[];
  @Input() user?: Patient;
  quizList?: Quiz[];
  quizSelected: boolean = false;

  constructor(private quizListService: QuizService, public statisticsService: StatisticsService, public datepipe: DatePipe) {
  }

  ngOnInit() {
    this.historic = this.statisticsService.getUserHistoric(this.user?.id!)!;
    this.quizListService.quizzes$.subscribe((quizzes: Quiz[]) => {
      this.quizList = quizzes;
    });
    this.quizSelected = false;
  }


  protected getTitle(quizId: string) {
    return this.quizList?.find(quiz => quiz.id == quizId)!.title;
  }

  protected quizChoice(value: string) {
    let pos = parseInt(value);
    if (value != "-1") {
      this.quizSelected = true;
      this.quizListService.selectQuiz(this.historic![pos].quizId);
      this.statisticsService.getUserQuizHistoric(this.historic![pos].quizId, this.user!.id, this.historic![pos].date);
      return;
    }
    this.quizSelected = false;
  }
}
