import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {UtilsService} from "../../../service/utils.service";

@Component({
  selector: "hobbies-select",
  templateUrl: "hobbies.component.html",
  styleUrls: ["hobbies.component.scss"]
})

export class HobbiesComponent implements OnInit {
  @Input() tags: string[] = [];
  @Input() placeHolder: string = "";
  @Output() updateTags: EventEmitter<string[]> = new EventEmitter<string[]>();

  data: string[] = [];
  selectedItems: string[] = [];
  loading: boolean = true;

  constructor(private utilsService: UtilsService) {
    this.utilsService.getTags().then(values => {
      this.data = [...new Set(values)];
    }).catch(() => {
      alert("Il y a eu une erreur lors de la récupération des différents hobbies \n Veuillez recharger la page");
    }).finally(() => this.loading = false);
  }

  ngOnInit() {
    this.tags.forEach((c: string) => {
      if (!this.data.some(hobby => hobby == c)) this.data.push(c);
      this.selectedItems.push(c);
    });
  }

  newTag(hobby: any) {
    return new Promise((resolve) => resolve(hobby));
  }

  onAdd(hobby: any) {
    this.data = [...this.data, hobby];
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
