import {NgModule} from "@angular/core";
import {RangeComponent} from "../range/range.component";
import {OptionsComponent} from "../options/options.component";
import {FontSizeComponent} from "../font-size/font-size.component";
import {NgStyle} from "@angular/common";

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
    NgStyle
  ]
})

export class SettingsModule{

}
