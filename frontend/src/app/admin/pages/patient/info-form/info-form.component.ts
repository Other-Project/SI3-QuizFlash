import {Component, EventEmitter, Input, Output} from "@angular/core";
import {AbstractControl, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
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
  protected readonly Date = Date;
  protected badNameInputText = "Seuls les lettres, les espaces et les traits d'union sont autorisés.";
  @Output() patientInfoChange: EventEmitter<any> = new EventEmitter;

  @Input() set user(patient: Patient | undefined) {
    this.currentPatient = patient;
    this.patientForm.patchValue({
      firstname: this.currentPatient?.firstname ?? "",
      lastname: this.currentPatient?.lastname ?? "",
      birthDate: this.currentPatient?.birthDate ?? "",
      pictureUrl: this.currentPatient?.pictureUrl,
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
    firstname: new FormControl("", [Validators.required, Validators.pattern(/^\p{L}+(?:[ -]\p{L}+)*$/u)]),
    lastname: new FormControl("", [Validators.required, Validators.pattern(/^\p{L}+(?:[ -]\p{L}+)*$/u)]),
    birthDate: new FormControl("", [Validators.required, this.dateValidator()]),
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
  }

  save() {
    if (!this.patientForm.valid) return;
    if (this.currentPatient) {
      this.patientInfoChange.emit();
      return this.userService.updateUser(this.currentPatient.id, this.patientForm.value);
    }
    this.userService.addUser(this.patientForm.value, user => this.router.navigate([user.id], {relativeTo: this.route}).then());
  }

  private dateValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (control.value >= this.getMinBirthDate() && control.value <= this.getMaxBirthDate())
        return null;
      return {"dateInvalid": true};
    };
  }

  private getDateByOffset(offsetYears: number): string {
    const date = new Date();
    date.setFullYear(date.getFullYear() + offsetYears);
    return date.toISOString().split("T")[0];
  }

  protected getMaxBirthDate(): string {
    return this.getDateByOffset(-1);
  }

  protected getMinBirthDate(): string {
    return this.getDateByOffset(-200);
  }
}
