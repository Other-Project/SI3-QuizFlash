import {Component, EventEmitter, Input, Output} from "@angular/core";
import {faCheck, faEdit, faTrash, faVenus, faXmark} from "@fortawesome/free-solid-svg-icons";
import {Patient} from "../../../../../models/patient.models";
import {UserService} from "../../../../../service/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {getDefaultProfilePicture, getFaIcon} from "../../../../../utils/profile-picture.utils";
import {Genders} from "../../../../../models/genders.model";

@Component({
  selector: 'patient-header',
  templateUrl: './patient-header.component.html',
  styleUrls: ['./patient-header.component.scss']
})

export class PatientHeaderComponent {
  @Input() patient?: Patient;
  edit: boolean = false;
  delete: boolean = false;
  @Output() patientInfoChange = new EventEmitter<{ firstname: string; lastname: string; age: number }>();

  constructor(public userService: UserService, private route: ActivatedRoute, private router: Router) {
  }

  editPatientInfo() {
    this.edit = !this.edit;
  }

  deletePatient() {
    if (!this.patient) return;
    this.userService.deleteUser(this.patient.id);
    this.router.navigate(["../../patients"], {relativeTo: this.route}).then();
  }

  displayDelete() {
    this.delete = !this.delete;
  }

  protected readonly faTrash = faTrash;
  protected readonly faCheck = faCheck;
  protected readonly faXmark = faXmark;
  protected readonly faEdit = faEdit;
  protected readonly faVenus = faVenus;
  protected readonly getDefaultProfilePicture = getDefaultProfilePicture;
  protected readonly Genders = Genders;
  protected readonly getFaIcon = getFaIcon;
}
