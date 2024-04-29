import {Component, OnDestroy} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../../service/user.service";
import {Patient} from "../../../../models/patient.models";

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
  public patient?: Patient;
  public tab: TabNavigation = TabNavigation.INFORMATION;

  private routeSub;
  private userSub;

  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService) {
    this.routeSub = this.route.params.subscribe(params => this.userId = params["user_id"]);
    this.userSub = this.userService.users$.subscribe(users => {
      if (!this.userId) this.patient = undefined;
      else {
        this.patient = users.find(user => user.id == this.userId) as Patient;
        if (!this.patient) this.router.navigate([".."], {relativeTo: this.route}).then();
      }
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
    this.userSub.unsubscribe();
  }

  protected readonly TabNavigation = TabNavigation;
}
