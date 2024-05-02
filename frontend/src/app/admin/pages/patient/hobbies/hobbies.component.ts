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

  dropdownSettings = {
    singleSelection: false,
    idField: 'item',
    textField: 'item',
    selectAllText: 'Tout sélectionner',
    unSelectAllText: 'Tout désélectionner',
    allowSearchFilter: true,
    searchPlaceholderText: "Rechercher des centres d'intérêt",
  };

  data?: string[];
  selectedItems?: string[];

  ngOnInit() {
    this.data = this.hobbies?.slice();
    this.selectedItems = this.patient?.hobbies.slice();
  }

  setHobbies(newHobbies: any) {
    if (!this.patient)
      return;

    this.newPatientHobbies.emit(newHobbies);
  }

  addHobby(hobby: any) {
    if (!this.patient)
      return;

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
