import {Component, OnInit, ViewChild} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../../../../service/user.service";
import {Patient} from "../../../../../models/patient.models";
import {QuestionType} from "../../../../../models/question-type.models";
import {StatisticsGraphComponent} from "../statistics-graph/statistics-graph.component";

@Component({
  selector: 'statistics',
  templateUrl: 'statistics.component.html',
  styleUrls: ['statistics.component.scss']
})

export class StatisticsComponent implements OnInit {
  @ViewChild(StatisticsGraphComponent) graph!: StatisticsGraphComponent;
  public user?: Patient;

  constructor(private route: ActivatedRoute, private userService: UserService) {
  }

  ngOnInit() {
    this.route.parent!.params.subscribe(params => {
      let user_id: string = params['user_id'];
      this.user = this.userService.getUserById(user_id) as Patient;
    });
  }

  quizSelection(quizSelectionData: { quizId?: string, questionType?: QuestionType }) {
    this.graph.quizSelection(quizSelectionData.quizId, quizSelectionData.questionType);
  }
}
