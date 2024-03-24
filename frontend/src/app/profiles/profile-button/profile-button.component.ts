import {Component, Input} from "@angular/core";
import {User} from "../../../models/user.models";
import {UserService} from "../../../service/user.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-profiles-button',
  templateUrl: './profile-button.component.html',
  styleUrls: ['./profile-button.component.scss']
})
export class ProfileButtonComponent {
  @Input() public user!: User; // To get access to the user the profile gets
  constructor(public userService: UserService, private router: Router) {}

  notifyUserService() {
    this.userService.setLoggedUser(this.user);
    this.redirectToUserProfile();
  }

  redirectToUserProfile() {
    this.router.navigate(["./quiz"]);
  }
}
