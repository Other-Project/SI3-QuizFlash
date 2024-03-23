import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../../../service/user.service";
import {User} from "../../../../models/user.models";

@Component({
  selector: 'patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})

export class PatientComponent implements OnInit {
  public user?: User;

  constructor(private route: ActivatedRoute, private userService: UserService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let user_id: string = params['user_id'];
      this.user = this.userService.getUserById(user_id);
    });
  }

  updatePatientInfo(newData: { firstName: string, lastName: string, age: number }) {
    this.userService.updatePatientInfo(this.user!.id, newData.firstName, newData.lastName, newData.age);
    console.log(newData);
  }
}
