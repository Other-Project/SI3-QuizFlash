import {Component} from "@angular/core";
import {User} from "../../../../../models/user.models";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../../../../service/user.service";

@Component({
  selector: 'statistics',
  templateUrl: 'statistics.component.html',
  styleUrls: ['statistics.component.scss']
})

export class StatisticsComponent{
  public user?: User;

  constructor(private route: ActivatedRoute, private userService: UserService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let user_id: string = params['user_id'];
      this.user = this.userService.getUserById(user_id);
    });
  }
}
