import {NgModule} from "@angular/core";
import {RangeComponent} from "../range/range.component";
import {OptionsComponent} from "../options/options.component";
import {FontSizeComponent} from "../font-size/font-size.component";
import {NgStyle} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {QuantityInputComponent} from "../quantity-input/quantity-input.component";

@NgModule({
  declarations: [
    RangeComponent,
    OptionsComponent,
    FontSizeComponent,
    QuantityInputComponent
  ],
  exports: [
    RangeComponent,
    OptionsComponent,
    FontSizeComponent
  ],
  imports: [
    NgStyle,
    ReactiveFormsModule,
    FormsModule
  ]
})

export class SettingsModule{

}
