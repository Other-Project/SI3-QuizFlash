import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../../../models/user.models";

@Component({
  selector: 'info-form',
  templateUrl: 'info-form.component.html',
  styleUrls: ['info-form.component.scss']
})

export class InfoFormComponent implements OnInit {
  @Output() patientInfoChange: EventEmitter<any> = new EventEmitter
  @Input() user?: User;

  edit: boolean = false;
  patientForm: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
    lastName: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
    age: new FormControl('', Validators.required)
  });

  constructor() {
  }

  ngOnInit(): void {
    this.patientForm.setValue({
      firstName: this.user?.firstname,
      lastName: this.user?.lastname,
      age: this.user?.age
    });
  }

  save() {
    if (this.patientForm.valid) this.patientInfoChange.emit(this.patientForm.value);
  }
}
