import {Component, EventEmitter, Output} from "@angular/core";
import {faTrash} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "delete-button",
  templateUrl: "./delete-button.component.html",
  styleUrls: ["./delete-button.component.scss"]
})
export class DeleteButtonComponent {
  @Output() deleteButtonClick: EventEmitter<any> = new EventEmitter;

  protected readonly faTrash = faTrash;

  deleteContent() {
    this.deleteButtonClick.emit();
  }
}
