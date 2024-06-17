import {Component, Input} from "@angular/core";

export enum Padding {
  BASE = "",
  NO_PADDING = "no-padding",
  ANSWER_THREE_FIFTY_FIFTY = "answer-three-fifty-fifty",
  OTHER_ANSWER_FIFTY_FIFTY = "other-answer-fifty-fifty"
}

export enum Scale {
  SMALL_SCALE = "small-scale",
  MEDIUM_SCALE = "medium-scale",
  LARGE_SCALE = "large-scale",
}

@Component({
  selector: "app-button",
  templateUrl: "./button.component.html",
  styleUrls: ["./button.component.scss"]
})
export class ButtonComponent {
  @Input() color: string = "white";
  @Input() padding: string = Padding.BASE;
  @Input() disabled: boolean = false;
  @Input() scale: string = Scale.LARGE_SCALE;
  @Input() borderRadius: boolean = false;
  @Input() visiblyDisabled: boolean = true;

  constructor() {
  }
}
