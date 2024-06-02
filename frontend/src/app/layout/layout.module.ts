import {NgModule} from "@angular/core";
import {HeaderComponent} from "./header/header.component";
import {NgIf, NgOptimizedImage, NgStyle} from "@angular/common";
import {ButtonComponent} from "./button/button.component";
import {ImageComponent} from "./image/image.component";
import {RouterLink} from "@angular/router";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {ImageInputComponent} from "./image-input/image-input.component";
import {InputComponent} from "./input/input.component";
import {FileInputComponent} from "./file-input/file-input.component";
import {QuantityInputComponent} from "./quantity-input/quantity-input.component";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    HeaderComponent,
    ButtonComponent,
    ImageComponent,
    ImageInputComponent,
    FileInputComponent,
    InputComponent,
    QuantityInputComponent
  ],
  exports: [
    HeaderComponent,
    ButtonComponent,
    ImageComponent,
    ImageInputComponent,
    FileInputComponent,
    InputComponent,
    QuantityInputComponent
  ],
  imports: [
    NgOptimizedImage,
    NgStyle,
    NgIf,
    RouterLink,
    FaIconComponent,
    FormsModule
  ]
})
export class LayoutModule {
}
