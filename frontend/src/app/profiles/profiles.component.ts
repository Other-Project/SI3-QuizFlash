import {Component} from "@angular/core";
import {User} from "../../models/user.models";
import {UserService} from "../../service/user.service";


@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss']
})
export class ProfilesComponent {
  public users?: User[];
  constructor(public userService1: UserService) {
    this.userService1.users$.subscribe((users: User[]) => {
      this.users = users;
    });
  }
}
