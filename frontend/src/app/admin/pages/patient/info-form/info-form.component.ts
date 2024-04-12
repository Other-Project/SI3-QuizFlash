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

  @Input() set user(user: User | undefined) {
    this.currentUser = user;
    this.patientForm.setValue({
      firstname: this.currentUser?.firstname ?? "",
      lastname: this.currentUser?.lastname ?? "",
      age: this.currentUser?.age ?? 1,
      pictureUrl: this.currentUser?.pictureUrl ?? "/assets/profile.png"
    });
  };

  public currentUser?: User;

  patientForm: FormGroup = new FormGroup({
    firstname: new FormControl("", [Validators.required, Validators.pattern("[a-zA-Z ]*")]),
    lastname: new FormControl("", [Validators.required, Validators.pattern("[a-zA-Z ]*")]),
    age: new FormControl("", Validators.required),
    pictureUrl: new FormControl("")
  });

  constructor(public userService: UserService, private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe(params => {
      let id = params["user_id"];
      this.currentUser = this.userService.getUserById(id) as Patient;
    });
  }

  save() {
    if (!this.patientForm.valid) return;
    if (this.currentUser) {
      console.log("currentUser défini");
      this.patientInfoChange.emit();
      return this.userService.updateUser(this.currentUser.id, this.patientForm.value);
    }
    let id: string = this.userService.addUser(this.patientForm.value);
    this.router.navigate([id], {relativeTo: this.route}).then();
  }
}
