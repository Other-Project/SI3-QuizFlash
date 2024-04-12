import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
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

  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService) {
    this.route.params.subscribe(params => {
      let user_id: string = params["user_id"];
      if (!user_id) this.user = undefined;
      else {
        this.userService.users$.subscribe(users => {
          this.user = users.find(user => user.id == user_id) as Patient;
          if (!this.user) this.router.navigate([".."], {relativeTo: this.route}).then();
        });
      }
    });
  }


  protected readonly TabNavigation = TabNavigation;
}
