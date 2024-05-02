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

  protected updatePatientHobbies(newHobbies: string[]) {
    if (this.patient)
      this.userService.updateUser(this.patient.id, {hobbies: newHobbies} as Patient);
  }

  updateSettings(patient: Patient) {
    if (this.patient) this.userService.updateUser(this.patient.id, patient);
  }
}
