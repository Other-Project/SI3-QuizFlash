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
    val = (this.min < 0) ? val.replace(/^(-)*\D*0*|^0|\D+/g, "$1") : val.replace(/^0+|\D/g, "");
    if (parseInt(val) < this.min || parseInt(val) > this.max)
      val = val.substring(0, val.toString().length - 1);
    this.valueInput.nativeElement.value = val;
    this.value = val;
  }
}
