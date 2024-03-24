import {Component, EventEmitter, Output} from "@angular/core";

@Component({
  selector: 'edit-button',
  templateUrl: 'edit-button.component.html',
  styleUrls: ['edit-button.component.scss']
})

export class EditButtonComponent {
  @Output() editButtonClick: EventEmitter<any> = new EventEmitter

  editContent() {
    this.editButtonClick.emit();
  }
}
