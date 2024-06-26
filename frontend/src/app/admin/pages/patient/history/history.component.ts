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
  protected quizStats?: QuizStats[];
  protected quizStat?: QuizStats;
  @Input() user?: Patient;
  quizList?: Quiz[];
  quizSelected: boolean = false;

  constructor(private quizListService: QuizService, public statisticsService: StatisticsService, public datepipe: DatePipe) {
  }

  ngOnInit() {
    this.statisticsService.userQuizStats$.subscribe(history => this.quizStats = history);
    if (this.user) this.statisticsService.getUserHistory(this.user.id);
    this.quizListService.quizzes$.subscribe((quizzes) => this.quizList = quizzes);
    this.quizSelected = false;
  }

  protected getTitle(quizId: string) {
    return this.quizList?.find(quiz => quiz.id == quizId)!.title;
  }

  protected quizChoice(id: string) {
    this.quizSelected = id != "-1";
    if (!this.quizSelected) return;

    this.quizStat = this.quizStats?.find(quizStats => quizStats.id == id);
    this.quizListService.selectQuiz(this.quizStat?.quizId);
  }
}
