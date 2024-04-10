import {Component} from "@angular/core";
import {faPencil} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-profile-picture",
  templateUrl: "./profile-picture.component.html",
  styleUrls: ["./profile-picture.component.scss"]
})
export class ProfilePictureComponent {

  protected readonly faPencil = faPencil;

  loadFile(event: any) {
    let image: any = (document.getElementById("default-profile-picture") as HTMLFormElement).reset();
    image.src = URL.createObjectURL(event.target.files[0]);
  };
}
