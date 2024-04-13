import {Component, EventEmitter, Input, Output} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../../../service/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Patient} from "../../../../../models/patient.models";
import {Dementia} from "../../../../../models/dementia.models";

@Component({
  selector: "info-form",
  templateUrl: "info-form.component.html",
  styleUrls: ["info-form.component.scss"]
})

export class InfoFormComponent {
  @Output() patientInfoChange: EventEmitter<any> = new EventEmitter;

  @Input() set user(patient: Patient | undefined) {
    this.currentPatient = patient;
    this.patientForm.patchValue({
      firstname: this.currentPatient?.firstname ?? "",
      lastname: this.currentPatient?.lastname ?? "",
      age: this.currentPatient?.age ?? 1,
      pictureUrl: this.currentPatient?.pictureUrl ?? "/assets/profile.png",
      hobbies: this.currentPatient?.hobbies ?? [],
      dementiaLevel: this.currentPatient?.dementiaLevel ?? Dementia.Mild,
      fontSize: this.currentPatient?.fontSize ?? 1,
      removeAnswers: this.currentPatient?.removeAnswers ?? false,
      automatedSkip: this.currentPatient?.automatedSkip ?? true,
      answerHint: this.currentPatient?.answerHint ?? true,
      numberOfQuestion: this.currentPatient?.numberOfQuestion ?? 3,
      replayAtEnd: this.currentPatient?.replayAtEnd ?? false,
      soundQuestion: this.currentPatient?.soundQuestion ?? true,
      autoStartAudio: this.currentPatient?.autoStartAudio ?? false
    });
  };

  public currentPatient?: Patient;

  patientForm: FormGroup = new FormGroup({
    firstname: new FormControl("", [Validators.required, Validators.pattern("[a-zA-Z ]*")]),
    lastname: new FormControl("", [Validators.required, Validators.pattern("[a-zA-Z ]*")]),
    age: new FormControl(1, Validators.required),
    pictureUrl: new FormControl("/assets/profile.png"),
    hobbies: new FormControl([""]),
    dementiaLevel: new FormControl(Dementia.Mild),
    fontSize: new FormControl(1),
    removeAnswers: new FormControl(false),
    automatedSkip: new FormControl(true),
    answerHint: new FormControl(true),
    numberOfQuestion: new FormControl(3),
    replayAtEnd: new FormControl(true),
    soundQuestion: new FormControl(true),
    autoStartAudio: new FormControl(false)
  });

  constructor(public userService: UserService, private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe(params => {
      let id = params["user_id"];
      this.currentPatient = this.userService.getUserById(id) as Patient;
    });
  }

  save() {
    if (!this.patientForm.valid) return;
    if (this.currentPatient) {
      this.patientInfoChange.emit();
      return this.userService.updateUser(this.currentPatient.id, this.patientForm.value);
    }
    let id: string = this.userService.addUser(this.patientForm.value);
    this.router.navigate([id], {relativeTo: this.route}).then();
  }
}
