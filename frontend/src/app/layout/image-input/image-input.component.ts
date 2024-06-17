import {Component, EventEmitter, forwardRef, Output} from "@angular/core";
import {ImageComponent} from "../image/image.component";
import {faCamera} from "@fortawesome/free-solid-svg-icons";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

export const CUSTOM_CONROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ImageInputComponent),
  multi: true
};

@Component({
  selector: "app-image-input",
  templateUrl: "./image-input.component.html",
  styleUrls: ["./image-input.component.scss"],
  providers: [CUSTOM_CONROL_VALUE_ACCESSOR]
})
export class ImageInputComponent extends ImageComponent implements ControlValueAccessor {
  @Output() onImageUpdate: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
    super();
  }

  imageUpdated(image: string) {
    this.onImageUpdate.emit(this.src = image);
  }

  protected readonly faCamera = faCamera;

  public writeValue(value: any) {
    this.src = value;
  }

  public registerOnChange(fn: any) {
    this.onImageUpdate.subscribe(fn);
  }

  public registerOnTouched(_: any) {
  }
}
