import {Component, EventEmitter, forwardRef, Input, Output} from "@angular/core";
import {ImageComponent} from "../image/image.component";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

export const CUSTOM_CONROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => FileInputComponent),
  multi: true
};

@Component({
  selector: "app-file-input",
  templateUrl: "./file-input.component.html",
  styleUrls: ["./file-input.component.scss"],
  providers: [CUSTOM_CONROL_VALUE_ACCESSOR]
})
export class FileInputComponent extends ImageComponent implements ControlValueAccessor {
  @Input() accept!: string;
  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
    super();
  }

  valueChanged(files: FileList) {
    if (files.length !== 1) return;

    const MIMEtype = new RegExp(this.accept.replace("*", ".\*"));
    if (!Array.prototype.every.call(files, file => MIMEtype.test(file.type))) return;

    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = () => this.valueChange.emit(this.src = reader.result as string);
  }

  public writeValue(value: any) {
    this.src = value;
  }

  public registerOnChange(fn: any) {
    this.valueChange.subscribe(fn);
  }

  public registerOnTouched(_: any) {
  }
}
