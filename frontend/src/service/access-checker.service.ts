import {Injectable} from "@angular/core";
import {UserService} from "./user.service";
import {User} from "../models/user.models";
import {AccessRestriction} from "../models/access-restriction.models";

@Injectable({
  providedIn: "root"
})
export class AccessChecker {
  private user?: User;

  constructor(userService: UserService) {
    userService.user$.subscribe(user => this.user = user);
  }

  canActivate(restriction: AccessRestriction = AccessRestriction.Guest) {
    if (!this.user) return restriction == AccessRestriction.Guest;
    return restriction <= this.user.access;
  }
}
