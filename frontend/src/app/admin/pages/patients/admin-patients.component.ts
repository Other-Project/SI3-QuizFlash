import {Component} from "@angular/core";
import {UserService} from "../../../../service/user.service";
import {User} from "../../../../models/user.models";
import {ProfileListComponent} from "../../../profiles/profile-list/profile-list.component";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: "app-admin-patients",
  templateUrl: "./admin-patients.component.html",
  standalone: true,
  imports: [
    ProfileListComponent
  ]
})
export class AdminPatientsComponent {
  public users?: User[];

  constructor(userService: UserService, private router: Router, private route: ActivatedRoute) {
    userService.users$.subscribe(users => this.users = users);
  }

  openUser(user: User) {
    this.router.navigate(["../patient", user.id], {relativeTo: this.route}).then();
  }
}
