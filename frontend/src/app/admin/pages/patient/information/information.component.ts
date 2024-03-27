import {Component, OnInit} from "@angular/core";
import {User} from "../../../../../models/user.models";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../../../../service/user.service";


@Component({
  selector: 'information',
  templateUrl: 'information.component.html',
  styleUrls: ['information.component.scss']
})

export class InformationComponent implements OnInit {
  user?: User;
  hobbies?: string[];

  constructor(private route: ActivatedRoute, private userService: UserService) {
  }

  ngOnInit() {
    this.route.parent!.params.subscribe(params => {
      let user_id: string = params['user_id'];
      this.user = this.userService.getUserById(user_id);
    });

    this.userService.hobbies$.subscribe(hobbies => {
      this.hobbies = hobbies;
    });
  }

  newDementiaLevel(dementiaLevel: number) {
    this.userService.updateDementiaLevel(this.user!.id, dementiaLevel);
  }

  updateHobbies(newHobbies: string[]) {
    this.userService.updatePatientHobbies(this.user!.id, newHobbies);
  }
}
