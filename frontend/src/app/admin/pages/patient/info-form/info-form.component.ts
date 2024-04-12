import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../../../models/user.models";
import {UserService} from "../../../../../service/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Patient} from "../../../../../models/patient.models";

@Component({
  selector: "info-form",
  templateUrl: "info-form.component.html",
  styleUrls: ["info-form.component.scss"]
})

export class InfoFormComponent {
  @Output() patientInfoChange: EventEmitter<any> = new EventEmitter;
  @Input() user?: User;

  edit: boolean = false;
  create: boolean = false;

  patientForm: FormGroup = new FormGroup({
    firstname: new FormControl("", [Validators.required, Validators.pattern("[a-zA-Z ]*")]),
    lastname: new FormControl("", [Validators.required, Validators.pattern("[a-zA-Z ]*")]),
    age: new FormControl("", Validators.required),
    pictureURL: new FormControl("")
  });

  constructor(public userService: UserService, private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe(params => {
      let id = params["user_id"];
      this.user = this.userService.getUserById(id) as Patient;
    });
  }

  save() {
    if (this.patientForm.valid) {
      if (this.user) return this.userService.updateUser(this.user.id, this.patientForm.value);
      let id: string = this.userService.addUser(this.patientForm.value);
      this.router.navigate([id], {relativeTo: this.route}).then();
      console.log(id);
    }
  }
}
