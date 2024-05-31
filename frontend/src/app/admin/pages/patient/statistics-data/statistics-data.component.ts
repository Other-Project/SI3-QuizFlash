import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {Quiz} from "../../../../../models/quiz.models";
import {QuestionType} from "../../../../../models/question-type.models";
import {DataTypes} from "../../../../../models/stats-enumerates";

@Component({
  selector: "stats-data",
  templateUrl: "statistics-data.component.html",
  styleUrls: ["statistics-data.component.scss"]
})

export class StatisticsDataComponent implements OnInit {
  @Input() data?: any;
  @Input() quizList?: Quiz[];
  @Input() answerHint?: boolean;
  @Input() patientId!: string;
  @Output() quizSelection: EventEmitter<any> = new EventEmitter<any>();

  quizSelected: boolean = false;
  questionTypes = {
    [-1]: "Tous les types de questions",
    [QuestionType.Sound]: "Questions auditives",
    [QuestionType.Image]: "Questions visuelles",
    [QuestionType.TextOnly]: "Questions textuelles"
  };
  protected readonly DataTypes = DataTypes;

  ngOnInit(): void {
    this.quizChoice();
  }

  quizChoice(quizId?: string, questionType?: QuestionType): void {
    this.quizSelected = !!quizId && quizId != "";
    if (questionType == -1 as unknown) questionType = undefined;
    this.quizSelection?.emit({quizId, questionType});
  }
}

