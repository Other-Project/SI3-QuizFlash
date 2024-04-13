import {Component, Input} from "@angular/core";
import {User} from "../../../../../models/user.models";

@Component({
  selector: 'statistics',
  templateUrl: 'statistics.component.html',
  styleUrls: ['statistics.component.scss']
})

export class StatisticsComponent{
  @Input() public user?: User;

  constructor() {
  }
}
