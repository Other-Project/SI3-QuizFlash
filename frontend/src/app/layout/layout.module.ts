import {NgModule} from '@angular/core';
import {HeaderComponent} from "./header/header.component";
import {NgOptimizedImage} from "@angular/common";

@NgModule({
  declarations: [
    HeaderComponent
  ],
  exports: [
    HeaderComponent
  ],
  imports: [
    NgOptimizedImage
  ]
})
export class LayoutModule {
}
