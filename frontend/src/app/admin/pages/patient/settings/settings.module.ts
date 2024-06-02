import {NgModule} from "@angular/core";
import {RangeComponent} from "../range/range.component";
import {OptionsComponent} from "../options/options.component";
import {FontSizeComponent} from "../font-size/font-size.component";
import {NgStyle} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LayoutModule} from "../../../../layout/layout.module";

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
    ReactiveFormsModule,
    FormsModule,
    LayoutModule
  ]
})

export class SettingsModule{

}
