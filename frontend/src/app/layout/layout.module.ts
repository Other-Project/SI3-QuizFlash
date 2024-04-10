import {NgModule} from "@angular/core";
import {HeaderComponent} from "./header/header.component";
import {NgIf, NgOptimizedImage, NgStyle} from "@angular/common";
import {ButtonComponent} from "./button/button.component";
import {ImageComponent} from "./image/image.component";
import {RouterLink} from "@angular/router";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {ProfilePictureComponent} from "./profile-picture/profile-picture.component";

@NgModule({
  declarations: [
    HeaderComponent,
    ButtonComponent,
    ImageComponent,
    ProfilePictureComponent
  ],
  exports: [
    HeaderComponent,
    ButtonComponent,
    ImageComponent,
    ProfilePictureComponent
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
