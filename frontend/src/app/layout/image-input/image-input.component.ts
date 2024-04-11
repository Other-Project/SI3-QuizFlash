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

  imageUpdated(images: FileList) {
    if (images.length !== 1) return;

    const reader = new FileReader();
    reader.readAsDataURL(images[0]);
    reader.onload = () => this.onImageUpdate.emit(this.src = reader.result as string);

  }

  protected readonly faCamera = faCamera;
}
