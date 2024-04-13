import {Component, EventEmitter, Output} from "@angular/core";
import {ImageComponent} from "../image/image.component";

@Component({
  selector: "app-file-input",
  templateUrl: "./file-input.component.html",
  styleUrls: ["./file-input.component.scss"]
})
export class FileInputComponent extends ImageComponent {
  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
    super();
  }

  valueChanged(files: FileList) {
    if (files.length !== 1) return;

    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = () => this.valueChange.emit(this.src = reader.result as string);

  }
}
