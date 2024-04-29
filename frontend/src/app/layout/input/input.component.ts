import {Component, EventEmitter, Input, Output} from "@angular/core";
import {ImageComponent} from "../image/image.component";
import {IconProp} from "@fortawesome/fontawesome-svg-core";

@Component({
  selector: "app-input",
  templateUrl: "./input.component.html",
  styleUrls: ["./input.component.scss"]
})
export class InputComponent extends ImageComponent {
  @Input() icon?: IconProp;
  @Input() value?: string;
  @Output() valueChange = new EventEmitter<string>();
  @Input() placeholder?: string;
  @Input() type = "text";
  @Input() disable = false;

  constructor() {
    super();
  }
}
