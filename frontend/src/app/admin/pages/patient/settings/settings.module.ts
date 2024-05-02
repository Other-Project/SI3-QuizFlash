import {NgModule} from "@angular/core";
import {RangeComponent} from "../range/range.component";
import {OptionsComponent} from "../options/options.component";
import {FontSizeComponent} from "../font-size/font-size.component";
import {NgStyle} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    RangeComponent,
    OptionsComponent,
    FontSizeComponent
  ],
  exports: [
    RangeComponent,
    OptionsComponent,
    FontSizeComponent
  ],
  imports: [
    NgStyle,
    ReactiveFormsModule
  ]
})

export class SettingsModule{

}
