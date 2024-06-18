import {Component, Input} from "@angular/core";

@Component({
  selector: "spinner-section",
  templateUrl: "spinner-section.component.html",
  styleUrls: ["spinner-section.component.scss"]
})

export class SpinnerSectionComponent {
  @Input() text?: string;
}
