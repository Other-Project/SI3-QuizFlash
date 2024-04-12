import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from "../../../../../models/user.models";
import {faCircleUser, faPencil} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'patient-header',
  templateUrl: './patient-header.component.html',
  styleUrls: ['./patient-header.component.scss']
})

export class PatientHeaderComponent implements OnInit{
  @Input() user?: User;
  edit: boolean = false;
  @Output() patientInfoChange = new EventEmitter<{ firstname: string; lastname: string; age: number }>();

  ngOnInit(): void {
  }

  editPatientInfo() {
    this.edit = !this.edit;
  }

  updatePatientInfo() {
    console.log("appel à updatePatientInfo");
    this.editPatientInfo();
  }
}
