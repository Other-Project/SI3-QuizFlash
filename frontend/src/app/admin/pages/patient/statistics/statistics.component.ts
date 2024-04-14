import {Component, Input, ViewChild} from "@angular/core";
import {Patient} from "../../../../../models/patient.models";
import {QuestionType} from "../../../../../models/question-type.models";
import {StatisticsGraphComponent} from "../statistics-graph/statistics-graph.component";

@Component({
  selector: 'statistics',
  templateUrl: 'statistics.component.html',
  styleUrls: ['statistics.component.scss']
})

export class StatisticsComponent {
  @ViewChild(StatisticsGraphComponent) graph!: StatisticsGraphComponent;
  @Input() public user?: Patient;

  quizSelection(quizSelectionData: { quizId?: string, questionType?: QuestionType }) {
    this.graph?.quizSelection(quizSelectionData.quizId, quizSelectionData.questionType);
  }
}
