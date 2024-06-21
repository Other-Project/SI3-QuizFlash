import {Component, Input} from "@angular/core";
import {UserService} from "../../../../../service/user.service";
import {Patient} from "../../../../../models/patient.models";


@Component({
  selector: 'information',
  templateUrl: 'information.component.html',
  styleUrls: ['information.component.scss']
})

export class InformationComponent {
  @Input() public patient?: Patient;

  constructor(private userService: UserService) {
  }

  protected updatePatientHobbies(newHobbies: string[]) {
    this.updateSettings({hobbies: newHobbies} as Patient);
  }

  updateSettings(patient: Patient) {
    if (this.patient) this.userService.updateUser(this.patient.id, patient);
  }
}
