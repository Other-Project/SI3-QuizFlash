import {NgModule} from "@angular/core";
import {HeaderComponent} from "./header/header.component";
import {NgIf, NgOptimizedImage, NgStyle} from "@angular/common";
import {ButtonComponent} from "./button/button.component";
import {ImageComponent} from "./image/image.component";
import {RouterLink} from "@angular/router";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";

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
    NgIf,
    RouterLink,
    FaIconComponent
  ]
})
export class LayoutModule {
}
