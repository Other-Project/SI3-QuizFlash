import {Component, EventEmitter, Input, Output} from "@angular/core";
import {User} from "../../../models/user.models";
import {ProfileButtonComponent} from "./profile-button/profile-button.component";
import {NgForOf} from "@angular/common";
import {LayoutModule} from "../../layout/layout.module";

@Component({
  selector: "app-profile-list",
  templateUrl: "./profile-list.component.html",
  standalone: true,
  imports: [
    ProfileButtonComponent,
    NgForOf,
    LayoutModule
  ],
  styleUrls: ["./profile-list.component.scss"]
})
export class ProfileListComponent {
  @Input() users?: User[];
  @Output() userSelected = new EventEmitter<User>();

  constructor() {
  }
}
