import {Component, Input, OnInit} from "@angular/core";
import {UserService} from "../../../../../service/user.service";
import {Patient} from "../../../../../models/patient.models";


@Component({
  selector: 'information',
  templateUrl: 'information.component.html',
  styleUrls: ['information.component.scss']
})

export class InformationComponent implements OnInit {
  @Input() public patient?: Patient;
  hobbies?: string[];

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.userService.hobbies$.subscribe(hobbies => {
      this.hobbies = hobbies;
    });
  }

  newDementiaLevel(dementiaLevel: number) {
    this.userService.updateDementiaLevel(this.patient!.id, dementiaLevel);
  }

  updateHobbies(newHobbies: string[]) {
    if (this.patient) this.userService.updateUserHobbies(this.patient.id, newHobbies);
  }

  addHobby(hobby: string) {
    if (this.patient) this.userService.addUserHobby(this.patient.id, hobby);
  }

  removeHobby(hobby: string) {
    if (this.patient) this.userService.removeUserHobby(this.patient.id, hobby);
  }
}
