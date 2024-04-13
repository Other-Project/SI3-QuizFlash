import {Component, Input, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../../../../service/user.service";
import {Patient} from "../../../../../models/patient.models";


@Component({
  selector: 'information',
  templateUrl: 'information.component.html',
  styleUrls: ['information.component.scss']
})

export class InformationComponent implements OnInit {
  @Input() public user?: Patient;
  hobbies?: string[];

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.userService.hobbies$.subscribe(hobbies => {
      this.hobbies = hobbies;
    });
  }

  newDementiaLevel(dementiaLevel: number) {
    this.userService.updateDementiaLevel(this.user!.id, dementiaLevel);
  }

  updateHobbies(newHobbies: string[]) {
    if (this.user) this.userService.updateUserHobbies(this.user.id, newHobbies);
  }

  addHobby(hobby: string) {
    if (this.user) this.userService.addUserHobby(this.user.id, hobby);
  }

  removeHobby(hobby: string) {
    if (this.user) this.userService.removeUserHobby(this.user.id, hobby);
  }
}
