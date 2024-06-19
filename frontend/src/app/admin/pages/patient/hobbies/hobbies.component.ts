import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {Patient} from "../../../../../models/patient.models";

@Component({
  selector: 'hobbies-select',
  templateUrl: 'hobbies.component.html',
  styleUrls: ['hobbies.component.scss'],
})

export class HobbiesComponent implements OnInit {
  @Input() hobbies?: string[];
  @Input() patient?: Patient;
  @Output() newPatientHobbies: EventEmitter<string[]> = new EventEmitter<string[]>();

  data: any[] = [];
  tagNames = ["test", "test2"];
  selectedItems?: string[];
  ngOnInit() {
    this.selectedItems = this.patient?.hobbies.slice();
    this.tagNames.forEach((c: string, i: number) => {
      this.data.push({id: i, name: c});
    });
  }

  setHobbies(newHobbies: any) {
    if (!this.patient)
      return;

    this.newPatientHobbies.emit(newHobbies);
  }

  newTag(hobby: any) {
    //if (!this.patient)
    //  return;
    //console.log(this.patient)
    //this.patient.hobbies.push(hobby);
    //this.data?.push(hobby);
    //this.newPatientHobbies.emit(this.patient.hobbies);
    return new Promise((resolve) => resolve({id: 5, name: hobby, valid: true}));
  }

  trackByFn(item: any) {
    return item.id;
  };

  selectedHobbies(hobby: any) {
    if (!this.patient)
      return;
    console.log(hobby);
    this.patient.hobbies.push(hobby);
    this.newPatientHobbies.emit(this.patient.hobbies);
  }

  removeHobby(hobby: any) {
    if (!this.patient)
      return;

    let itemIndex: number = this.patient.hobbies.indexOf(hobby);
    if (itemIndex >= 0)
      this.patient.hobbies.splice(itemIndex, 1);
    this.newPatientHobbies.emit(this.patient.hobbies);
  }
}
