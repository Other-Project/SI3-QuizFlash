import {Component, OnInit} from "@angular/core";
import {QuizListService} from "../../../../../service/quiz-list-service.service";
import {Quiz} from "../../../../../models/quiz.models";

@Component({
  selector: 'stats-data',
  templateUrl: 'statistics-data.component.html',
  styleUrls: ['statistics-data.component.scss']
})

export class StatisticsDataComponent implements OnInit{
  questionTypes: string[] = ["Questions textuelles","Questions auditives","Questions visuelles"];
  successRate: number = 70;
  questionSuccessRate: number = 10;
  assistedQuestionRate: number = 15;
  spentTime: number = 20;
  quizList?: Quiz[];
  quizSelected: boolean = false;

  constructor(private quizListService: QuizListService) {
  }

  ngOnInit(): void {
    this.quizListService.quizzes$.subscribe((quizzes: Quiz[]) => {
      this.quizList = quizzes;
    });
  }

  quizChoice($event: any):void {
    const quizId = $event.target.value;
    this.quizSelected = quizId!="all";
  }
}

