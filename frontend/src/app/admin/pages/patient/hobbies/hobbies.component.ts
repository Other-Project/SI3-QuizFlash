import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IDropdownSettings} from 'ng-multiselect-dropdown';

@Component({
  selector: 'hobbies-select',
  templateUrl: 'hobbies.component.html',
  styleUrls: ['hobbies.component.scss'],
})

export class HobbiesComponent implements OnInit {
  @Input() hobbies?: string[];
  @Input() userHobbies?: string[];
  @Output() newHobbiesSelected: EventEmitter<string[]> = new EventEmitter<string[]>();

  dropdownSettings: IDropdownSettings = {};

  data?: string[];
  selectedItems?: string[];

  ngOnInit() {
    this.data = this.hobbies?.slice();
    this.selectedItems = this.userHobbies?.slice();

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item',
      textField: 'item',
      selectAllText: 'Tout sélectionner',
      unSelectAllText: 'Tout désélectionner',
      allowSearchFilter: true,
      searchPlaceholderText: "Rechercher des centres d'intérêt",
    };
  }

  addHobby(item: any) {
    this.userHobbies?.push(item);
    this.updateUserHobbies();
  }

  setHobbies(items: any) {
    this.userHobbies = items;
    this.updateUserHobbies();
  }

  removeHobby(item: any) {
    if (this.userHobbies) {
      let itemIndex: number = this.userHobbies.indexOf(item, 0);
      if (itemIndex > -1) {
        this.userHobbies.splice(itemIndex, 1);
        this.updateUserHobbies();
      }
    }
  }

  updateUserHobbies() {
    this.newHobbiesSelected.emit(this.userHobbies);
  }
}
