import {Component, OnInit} from "@angular/core";
import {Observable} from "rxjs";
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
  quizList$: Observable<Quiz[]> | undefined;
  quizSelected: boolean = false;

  constructor(private quizListService: QuizListService) {
  }

  ngOnInit(): void {
    this.quizList$ = this.quizListService.quizz$;
    console.log(this.quizList$);
  }

  quizChoice($event: any):void {
    const quizId = $event.target.value;
    this.quizSelected = quizId!="all";
  }
}

