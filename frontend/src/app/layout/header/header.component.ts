import {Component, Input} from "@angular/core";
import {faSignOut} from "@fortawesome/free-solid-svg-icons";
import {UserService} from "../../../service/user.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent {
  @Input() homePage?: any[] | string;
  @Input() interactive: boolean = true;

  loggedIn: boolean = false;

  constructor(private userService: UserService) {
    userService.user$.subscribe(user => this.loggedIn = user != undefined);
  }

  public logout() {
    if (!this.loggedIn) return;
    this.userService.setLoggedUser();
  }

  protected readonly faSignOut = faSignOut;
}
