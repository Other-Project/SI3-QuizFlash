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
  private userId?: string;
  public user?: Patient;
  public tab: TabNavigation = TabNavigation.INFORMATION;

  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService) {
    this.route.params.subscribe(params => this.userId = params["user_id"]);
    this.userService.users$.subscribe(users => {
      if (!this.userId) this.user = undefined;
      else {
        this.user = users.find(user => user.id == this.userId) as Patient;
        if (!this.user) this.router.navigate([".."], {relativeTo: this.route}).then();
      }
    });
  }


  protected readonly TabNavigation = TabNavigation;
}
