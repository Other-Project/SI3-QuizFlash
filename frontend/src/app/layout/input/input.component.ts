import {Component, EventEmitter, forwardRef, Input, Output} from "@angular/core";
import {ImageComponent} from "../image/image.component";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

export const CUSTOM_CONROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputComponent),
  multi: true
};

@Component({
  selector: "app-input",
  templateUrl: "./input.component.html",
  styleUrls: ["./input.component.scss"],
  providers: [CUSTOM_CONROL_VALUE_ACCESSOR]
})
export class InputComponent extends ImageComponent implements ControlValueAccessor {
  @Input() icon?: IconProp;
  @Input() value?: string;
  @Output() valueChange = new EventEmitter<string>();
  @Input() placeholder?: string;
  @Input() type = "text";
  @Input() disabled: boolean = false;

  constructor() {
    super();
  }

  // *** ControlValueAccessor Methods
  public setDisabledState(d: boolean) {
    this.disabled = d;
  }

  public writeValue(value: any) {
    this.value = value;
  }

  public registerOnChange(fn: any) {
    this.valueChange.subscribe(fn);
  }

  public registerOnTouched(_: any) {
  }
}
