import {Component, Input} from "@angular/core";
import {Patient} from "../../../../../models/patient.models";
import {QuizStats} from "../../../../../models/quiz-stats.model";
import {Quiz} from "../../../../../models/quiz.models";
import {QuizService} from "../../../../../service/quiz-service.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: "question-stats",
  templateUrl: "quiz-stats-part.component.html",
  styleUrls: ["quiz-stats-part.component.scss"]
})

export class QuizStatsPartComponent {
  quiz?: Quiz;
  @Input() user?: Patient;
  @Input() stats?: QuizStats;

  constructor(quizListService: QuizService, public datepipe: DatePipe) {
    quizListService.quiz$.subscribe(quiz => this.quiz = quiz);
  }

  getTimeSpent() {
    return this.stats?.questionsStats.flatMap(attempt => attempt.attempts.map(attempt => attempt.timeSpent)).reduce((acc, c) => acc + c, 0);
  }
}
