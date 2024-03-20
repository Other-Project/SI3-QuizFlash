import {Component} from "@angular/core";
import {User} from "../../../../../models/user.models";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../../../../service/user.service";


@Component({
  selector: 'information',
  templateUrl: 'information.component.html',
  styleUrls: ['information.component.scss']
})

export class InformationComponent{
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
