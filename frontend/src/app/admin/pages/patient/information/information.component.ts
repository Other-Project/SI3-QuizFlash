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

  constructor(private userService: UserService) {
  }

  ngOnInit() {
  }

  protected updatePatientHobbies(newHobbies: string[]) {
    this.updateSettings({hobbies: newHobbies} as Patient);
  }

  updateSettings(patient: Patient) {
    if (this.patient) this.userService.updateUser(this.patient.id, patient);
  }
}
