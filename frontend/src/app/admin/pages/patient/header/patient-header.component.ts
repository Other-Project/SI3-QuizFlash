import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from "../../../../../models/user.models";

@Component({
  selector: 'patient-header',
  templateUrl: './patient-header.component.html',
  styleUrls: ['./patient-header.component.scss']
})

export class PatientHeaderComponent implements OnInit{
  @Input() user?: User;
  edit: boolean = false;
  @Output() patientInfoChange = new EventEmitter<{ firstName: string; lastName: string; age: number }>();

  ngOnInit(): void {
  }

  editPatientInfo() {
    this.edit = !this.edit;
  }

  updatePatientInfo(newData: { firstName: string, lastName: string, age: number }) {
    this.patientInfoChange.emit(newData);
    this.editPatientInfo();
  }
}
