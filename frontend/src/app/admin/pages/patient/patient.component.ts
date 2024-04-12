import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../../../service/user.service";
import {User} from "../../../../models/user.models";
import {Patient} from "../../../../models/patient.models";
import {Quiz} from "../../../../models/quiz.models";

export enum TabNavigation {
  INFORMATION,
  STATISTICS
}

@Component({
  selector: 'patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})

export class PatientComponent {
  public user?: Patient;
  public tab: TabNavigation = TabNavigation.INFORMATION;

  constructor(private route: ActivatedRoute, private userService: UserService) {
    this.route.params.subscribe(params => {
      let user_id: string = params["user_id"];
      this.user = this.userService.getUserById(user_id) as Patient;
    });
  }

  updatePatientInfo() {
    console.log(this.user);
    this.userService.updateUser(this.user!.id, this.user as Patient);
  }

  protected readonly TabNavigation = TabNavigation;
}
