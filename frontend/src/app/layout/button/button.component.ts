import {Component, Input} from "@angular/core";

@Component({
  selector: "app-button",
  templateUrl: "./button.component.html",
  styleUrls: ["./button.component.scss"]
})
export class ButtonComponent {
  @Input() color: string = "white";
  @Input() padding: string = "";
  @Input() disabled: boolean = false;
  @Input() scale: string = "large-scale";
  @Input() borderRadius: boolean = false;

  constructor() {
  }
}
