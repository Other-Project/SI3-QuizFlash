import {Component, Input} from "@angular/core";

@Component({
  selector: 'stats-data',
  templateUrl: 'statistics-data.component.html',
  styleUrls: ['statistics-data.component.scss']
})

export class StatisticsDataComponent{
  quizzes: Quiz[] = [
    new Quiz("quiz1","Quizz 1"),
    new Quiz("quiz2","Quizz 2"),
    new Quiz("quiz3","Quizz 3"),
    new Quiz("quiz4","Quizz 4")
  ];
  questionTypes: string[] = ["Questions textuelles","Questions auditives","Questions visuelles"];
  successRate: number = 70;
  questionSuccessRate: number = 10;
  assistedQuestionRate: number = 15;
  spentTime: number = 20;
}

class Quiz{
  id: string = "";
  name: string = "";

  constructor(id: string, name: string) {
    this.id=id;
    this.name=name;
  }
}
