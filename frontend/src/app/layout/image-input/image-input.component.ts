import {Component, EventEmitter, Output} from "@angular/core";
import {ImageComponent} from "../image/image.component";
import {faCamera} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-image-input",
  templateUrl: "./image-input.component.html",
  styleUrls: ["./image-input.component.scss"]
})
export class ImageInputComponent extends ImageComponent {
  @Output() onImageUpdate: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
    super();
  }

  imageUpdated(image: string) {
    this.onImageUpdate.emit(this.src = image);
  }

  protected readonly faCamera = faCamera;
}
