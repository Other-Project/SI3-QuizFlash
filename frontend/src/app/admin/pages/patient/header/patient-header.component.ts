import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from "../../../../../models/user.models";
import {faCircleUser, faPencil} from "@fortawesome/free-solid-svg-icons";
import {Patient} from "../../../../../models/patient.models";

@Component({
  selector: 'patient-header',
  templateUrl: './patient-header.component.html',
  styleUrls: ['./patient-header.component.scss']
})

export class PatientHeaderComponent implements OnInit{
  @Input() user?: Patient;
  edit: boolean = false;
  @Output() patientInfoChange = new EventEmitter<{ firstname: string; lastname: string; age: number }>();

  ngOnInit(): void {
  }

  editPatientInfo() {
    this.edit = !this.edit;
  }

  updatePatientInfo() {
    this.editPatientInfo();
  }
}
