import {Component, EventEmitter, Output} from "@angular/core";

@Component({
  selector:'app-admin-button',
  templateUrl:'./admin-button.component.html',
  styleUrls:['./admin-button.component.scss']
})
export class AdminButtonComponent {
  @Output() connectAsAdmin = new EventEmitter();

  constructor() {
  }
}
