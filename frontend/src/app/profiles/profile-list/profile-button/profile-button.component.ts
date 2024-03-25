import {Component, Input} from "@angular/core";
import {User} from "../../../../models/user.models";
import {LayoutModule} from "../../../layout/layout.module";


@Component({
  selector: "app-profiles-button",
  templateUrl: "./profile-button.component.html",
  standalone: true,
  imports: [
    LayoutModule
  ],
  styleUrls: ["./profile-button.component.scss"]
})
export class ProfileButtonComponent {
  @Input() public user!: User; // To get access to the user the profile gets
  constructor() {
  }
}
