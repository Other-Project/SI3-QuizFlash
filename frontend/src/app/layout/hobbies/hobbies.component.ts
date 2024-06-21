import {Component, EventEmitter, forwardRef, Input, Output} from "@angular/core";
import {UtilsService} from "../../../service/utils.service";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

export const CUSTOM_CONROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => HobbiesComponent),
  multi: true
};

@Component({
  selector: "hobbies-select",
  templateUrl: "hobbies.component.html",
  styleUrls: ["hobbies.component.scss"],
  providers: [CUSTOM_CONROL_VALUE_ACCESSOR]
})

export class HobbiesComponent implements ControlValueAccessor {
  @Input() tags: string[] = [];
  @Input() placeHolder: string = "";
  @Output() updateTags: EventEmitter<string[]> = new EventEmitter<string[]>();

  availableTags: string[] = [];
  loading: boolean = true;

  constructor(private utilsService: UtilsService) {
    this.utilsService.getTags().then(values => {
      this.availableTags = values;
    }).catch(() => {
      alert("Il y a eu une erreur lors de la récupération des différents centres d'intérêt.\nVeuillez recharger la page");
    }).finally(() => this.loading = false);
  }

  newTag(hobby: any) {
    return new Promise((resolve) => resolve(hobby));
  }

  onAdd(hobby: any) {
    if (this.availableTags.includes(hobby))
      return;
    this.availableTags = [...this.availableTags, hobby]; //https://github.com/ng-select/ng-select/tree/master
    this.updateTags.emit(this.tags);
  }

  onRemove(removedHobby: any) {
    this.tags = this.tags.filter(hobby => hobby != removedHobby);
    this.updateTags.emit(this.tags);
  }

  onRemoveAll() {
    this.tags = [];
    this.updateTags.emit(this.tags);
  }

  registerOnChange(fn: any): void {
    this.updateTags.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(obj: any): void {
    this.tags = obj;
  }
}
