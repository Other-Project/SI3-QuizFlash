import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../../../../service/user.service";
import {Patient} from "../../../../../models/patient.models";
import {Subject} from "rxjs";

@Component({
  selector: 'statistics',
  templateUrl: 'statistics.component.html',
  styleUrls: ['statistics.component.scss']
})

export class StatisticsComponent implements OnInit {
  public user?: Patient;
  protected quizSelectionEvent: Subject<any> = new Subject<{ quizId: string, questionType: string }>();

  constructor(private route: ActivatedRoute, private userService: UserService) {
  }

  ngOnInit() {
    this.route.parent!.params.subscribe(params => {
      let user_id: string = params['user_id'];
      this.user = this.userService.getUserById(user_id) as Patient;
    });
  }

  quizSelection(quizSelectionData: { quizId: string, questionType: string }) {
    this.quizSelectionEvent.next(quizSelectionData);
  }
}
