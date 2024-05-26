import {Component} from "@angular/core";
import {User} from "../../models/user.models";
import {UserService} from "../../service/user.service";
import {Router} from "@angular/router";
import {AccessRestriction} from "../../models/access-restriction.models";
import {USER_ANNE} from "../../mocks/user-anne.mock";


@Component({
  selector: "app-profiles",
  templateUrl: "./profiles.component.html",
  styleUrls: ["./profiles.component.scss"]
})
export class ProfilesComponent {
  public users?: User[];

  constructor(public userService: UserService, private router: Router) {
    this.userService.users$.subscribe((users) => {
      //TODO : filter
      this.users = users.filter(user => user.access <= AccessRestriction.User);
      console.log(users);
    });

    this.userService.user$.subscribe(user => {
      if (user) this.navigateToHomePage(user);
    });
  }

  loginAs(user: User) {
    this.userService.setLoggedUser(user);
    this.navigateToHomePage(user);
  }

  navigateToHomePage(user: User) {
    this.router.navigate([user.access == AccessRestriction.Admin ? "./admin" : "./quizzes"]).then();
  }

  protected readonly USER_ANNE = USER_ANNE;
}
