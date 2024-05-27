import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from "@angular/core";

@Component({
  selector: "quantity-input",
  templateUrl: "quantity-input.component.html",
  styleUrls: ["quantity-input.component.scss"]
})

export class QuantityInputComponent {
  @ViewChild("valueInput") valueInput!: ElementRef;
  @Input() label!: string;
  @Input() min: number = -Infinity;
  @Input() max: number = Infinity;
  @Input() value: number = 0;
  @Output() valueChange: EventEmitter<number> = new EventEmitter<number>();

  increment(): void {
    if (this.value < this.max) {
      this.value++;
      this.valueChange.emit(this.value);
    }
  }

  decrement(): void {
    if (this.value > this.min) {
      this.value--;
      this.valueChange.emit(this.value);
    }
  }

  onChange(newVal: number): void {
    if (newVal > this.min && newVal < this.max)
      this.valueChange.emit(newVal);
  }

  checkValue(): void {
    let val = this.valueInput.nativeElement.value;
    let isNegative = this.min < 0 ? val.charAt(0) === "-" : false;
    val = val.replace(/^0+|\D/g, "");
    let refValue = (isNegative) ? Math.abs(this.min) : this.max;
    if (parseInt(val) > refValue)
      val = val.substring(0, val.toString().length - 1);
    this.valueInput.nativeElement.value = val;
    this.value = val;
  }
}
