import {NgModule} from "@angular/core";
import {RangeComponent} from "../range/range.component";
import {OptionsComponent} from "../options/options.component";

@NgModule({
  declarations: [
    RangeComponent,
    OptionsComponent
  ],
  exports: [
    RangeComponent,
    OptionsComponent
  ],
  imports: []
})

export class SettingsModule{

}
