import {Component, Input} from "@angular/core";
import {User} from "../../../models/user.models";
import {UserService} from "../../../service/user.service";


@Component({
  selector: 'app-profiles-button',
  templateUrl: './profiles-button.component.html',
  styleUrls: ['./profiles-button.component.scss']
})
export class ProfileButtonComponent {
  @Input()
  public user!: User;
  constructor() {
  }
}
