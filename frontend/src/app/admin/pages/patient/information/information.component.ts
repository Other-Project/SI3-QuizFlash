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
    if (this.patient) {
      this.patient.dementiaLevel = dementiaLevel;
      this.userService.updateUser(this.patient.id, this.patient);
    }
  }

  updateHobbies(newHobbies: string[]) {
    if (this.patient) {
      this.patient.hobbies = newHobbies;
      this.userService.updateUser(this.patient.id, this.patient);
    }
  }

  addHobby(hobby: string) {
    if (this.patient) {
      this.patient.hobbies.push(hobby);
      this.userService.updateUser(this.patient.id, this.patient);
    }
  }

  removeHobby(hobby: string) {
    if (this.patient) {
      let itemIndex: number = this.patient.hobbies.indexOf(hobby);
      if (itemIndex > -1)
        this.patient.hobbies.splice(itemIndex, 1);
      this.userService.updateUser(this.patient.id, this.patient);
    }
  }

  updateSettings(patient: Patient) {
    this.userService.updateUser(patient.id, patient);
  }
}
