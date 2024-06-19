import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {Patient} from "../../../../../models/patient.models";

@Component({
  selector: 'hobbies-select',
  templateUrl: 'hobbies.component.html',
  styleUrls: ['hobbies.component.scss'],
})

export class HobbiesComponent implements OnInit {
  @Input() hobbies: string[] = [];
  @Input() patient?: Patient;
  @Output() newPatientHobbies: EventEmitter<string[]> = new EventEmitter<string[]>();

  data: string[] = [];
  selectedItems: string[] = [];
  ngOnInit() {
    this.hobbies.forEach((c: string) => {
      this.data.push(c);
    });
    this.patient?.hobbies.forEach((c: string) => {
      if (!this.data.some(hobby => hobby == c)) this.data.push(c);
      this.selectedItems.push(c);
    });
  }

  newTag(hobby: any) {
    return new Promise((resolve) => {
      resolve(hobby);
    });
  }

  onAdd(hobby: any) {
    if (!this.patient) return;

    this.patient.hobbies.push(hobby);
    this.newPatientHobbies.emit(this.patient.hobbies);
  }

  onRemove(removedHobby: any) {
    if (!this.patient) return;

    this.patient.hobbies = this.patient.hobbies.filter(hobby => hobby != removedHobby);
    this.newPatientHobbies.emit(this.patient.hobbies);
  }

  onRemoveAll() {
    if (!this.patient) return;

    this.patient.hobbies = [];
    this.newPatientHobbies.emit(this.patient.hobbies);
  }
}
