import {Component, Input} from "@angular/core";
import {User} from "../../../models/user.models";


@Component({
  selector: 'app-profiles-button',
  templateUrl: './profile-button.component.html',
  styleUrls: ['./profile-button.component.scss']
})
export class ProfileButtonComponent {
  @Input() public user!: User; // To get access to the user the profile gets
  constructor() {
  }
}
