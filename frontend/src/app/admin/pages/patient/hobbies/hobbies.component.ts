import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'hobbies-select',
  templateUrl: 'hobbies.component.html',
  styleUrls: ['hobbies.component.scss'],
})

export class HobbiesComponent implements OnInit {
  @Input() hobbies?: string[];
  @Input() userHobbies?: string[];
  @Output() newHobbiesSelected: EventEmitter<string[]> = new EventEmitter<string[]>();
  @Output() addedHobby: EventEmitter<string> = new EventEmitter<string>();
  @Output() removedHobby: EventEmitter<string> = new EventEmitter<string>();

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
    this.selectedItems = this.userHobbies?.slice();
  }

  addHobby(hobby: any) {
    this.addedHobby.emit(hobby);
  }

  setHobbies(hobbies: any) {
    this.newHobbiesSelected.emit(hobbies);
  }

  removeHobby(hobby: any) {
    this.removedHobby.emit(hobby);
  }
}
