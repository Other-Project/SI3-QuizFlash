import {Component, EventEmitter, Input, Output} from "@angular/core";
import {Patient} from "../../../../../models/patient.models";

@Component({
  selector: 'font-size-selector',
  templateUrl: 'font-size.component.html',
  styleUrls: ['font-size.component.scss']
})

export class FontSizeComponent {
  @Input() patient?: Patient;
  @Output() fontSizeChange: EventEmitter<Patient> = new EventEmitter();

  changeFontSize(newFontSize: number): void {
    this.fontSizeChange.emit({fontSize: newFontSize} as Patient);
  }
}
