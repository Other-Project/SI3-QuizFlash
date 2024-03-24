import {NgModule} from '@angular/core';
import {HeaderComponent} from "./header/header.component";
import {NgIf, NgOptimizedImage, NgStyle} from "@angular/common";
import {ButtonComponent} from "./button/button.component";
import {ImageComponent} from "./image/image.component";

@NgModule({
  declarations: [
    HeaderComponent,
    ButtonComponent,
    ImageComponent
  ],
  exports: [
    HeaderComponent,
    ButtonComponent,
    ImageComponent
  ],
  imports: [
    NgOptimizedImage,
    NgStyle,
    NgIf
  ]
})
export class LayoutModule {
}
