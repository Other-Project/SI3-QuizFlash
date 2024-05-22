import {Component, EventEmitter, Input, Output} from "@angular/core";

@Component({
  selector: "quantity-input",
  templateUrl: "quantity-input.component.html",
  styleUrls: ["quantity-input.component.scss"]
})

export class QuantityInputComponent {
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

  onChange(): void {
    this.valueChange.emit(this.value);
  }
}
