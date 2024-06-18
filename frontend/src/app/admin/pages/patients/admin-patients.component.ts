import {Component} from "@angular/core";
import {UserService} from "../../../../service/user.service";
import {User} from "../../../../models/user.models";
import {ProfileListComponent} from "../../../profiles/profile-list/profile-list.component";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {AccessRestriction} from "../../../../models/access-restriction.models";
import {LayoutModule} from "../../../layout/layout.module";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faAdd} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-admin-patients",
  styleUrls: ["./admin-patients.component.scss"],
  templateUrl: "./admin-patients.component.html",
  standalone: true,
  imports: [
    ProfileListComponent,
    RouterLink,
    LayoutModule,
    FaIconComponent
  ]
})
export class AdminPatientsComponent {
  public allUsers?: User[];
  public users?: User[];

  constructor(userService: UserService, private router: Router, private route: ActivatedRoute) {
    userService.users$.subscribe(users => {
      if (users) this.users = this.allUsers = users.filter(user => user.access <= AccessRestriction.User);
    });
  }

  openUser(user: User) {
    this.router.navigate(["../patient", user.id], {relativeTo: this.route}).then();
  }

  searchUser(text: string) {
    this.users = text ? this.allUsers?.filter(user => (user.firstname + " " + user.lastname).toLowerCase().includes(text.toLowerCase())) : this.allUsers;
  }

  protected readonly faAdd = faAdd;
}
