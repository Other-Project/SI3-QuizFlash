import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {faCheck, faEdit, faTrash, faXmark} from "@fortawesome/free-solid-svg-icons";
import {Patient} from "../../../../../models/patient.models";
import {UserService} from "../../../../../service/user.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'patient-header',
  templateUrl: './patient-header.component.html',
  styleUrls: ['./patient-header.component.scss']
})

export class PatientHeaderComponent implements OnInit{
  @Input() patient?: Patient;
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
}
