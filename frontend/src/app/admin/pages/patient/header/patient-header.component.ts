import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from "../../../../../models/user.models";
import {faCheck, faCircleUser, faPencil, faTrash, faXmark} from "@fortawesome/free-solid-svg-icons";
import {Patient} from "../../../../../models/patient.models";
import {UserService} from "../../../../../service/user.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'patient-header',
  templateUrl: './patient-header.component.html',
  styleUrls: ['./patient-header.component.scss']
})

export class PatientHeaderComponent implements OnInit{
  @Input() user?: Patient;
  edit: boolean = false;
  delete: boolean = false;
  @Output() patientInfoChange = new EventEmitter<{ firstname: string; lastname: string; age: number }>();

  constructor(public userService: UserService, private route: ActivatedRoute, private router: Router) {
  }
  ngOnInit(): void {
  }

  editPatientInfo() {
    this.edit = !this.edit;
  }

  deletePatient() {
    this.userService.deleteUser(this.user!.id);
    this.router.navigate(["../../patients"], {relativeTo: this.route}).then();
  }

  displayDelete() {
    this.delete = !this.delete;
  }

  updatePatientInfo() {
    this.editPatientInfo();
  }

  protected readonly faTrash = faTrash;
  protected readonly faCheck = faCheck;
  protected readonly faXmark = faXmark;
}
