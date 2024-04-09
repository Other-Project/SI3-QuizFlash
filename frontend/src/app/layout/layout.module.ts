import {NgModule} from "@angular/core";
import {HeaderComponent} from "./header/header.component";
import {NgIf, NgOptimizedImage, NgStyle} from "@angular/common";
import {ButtonComponent} from "./button/button.component";
import {ImageComponent} from "./image/image.component";
import {RouterLink} from "@angular/router";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {ImageInputComponent} from "./image-input/image-input.component";

@NgModule({
  declarations: [
    HeaderComponent,
    ButtonComponent,
    ImageComponent,
    ImageInputComponent
  ],
  exports: [
    HeaderComponent,
    ButtonComponent,
    ImageComponent,
    ImageInputComponent
  ],
  imports: [
    NgOptimizedImage,
    NgStyle,
    NgIf,
    RouterLink,
    FaIconComponent
  ]
})
export class LayoutModule {
}
