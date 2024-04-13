import {Component, OnDestroy, OnInit} from "@angular/core";
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

export class PatientComponent implements OnDestroy {
  private userId?: string;
  public user?: Patient;
  public tab: TabNavigation = TabNavigation.INFORMATION;

  private routeSub;
  private userSub;

  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService) {
    this.routeSub = this.route.params.subscribe(params => this.userId = params["user_id"]);
    this.userSub = this.userService.users$.subscribe(users => {
      if (!this.userId) this.user = undefined;
      else {
        this.user = users.find(user => user.id == this.userId) as Patient;
        if (!this.user) this.router.navigate([".."], {relativeTo: this.route}).then();
      }
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
    this.userSub.unsubscribe();
  }

  protected readonly TabNavigation = TabNavigation;
}
