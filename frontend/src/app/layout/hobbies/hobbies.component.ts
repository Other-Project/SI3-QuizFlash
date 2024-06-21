import {Component, EventEmitter, Input, Output} from "@angular/core";
import {UtilsService} from "../../../service/utils.service";

@Component({
  selector: "hobbies-select",
  templateUrl: "hobbies.component.html",
  styleUrls: ["hobbies.component.scss"]
})

export class HobbiesComponent {
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
    this.availableTags = [...this.availableTags, hobby]; //https://github.com/ng-select/ng-select/tree/master
    this.tags.push(hobby);
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
}
