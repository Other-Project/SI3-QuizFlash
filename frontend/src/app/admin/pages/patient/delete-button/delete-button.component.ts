import {Component} from "@angular/core";
import {faTrash} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "delete-button",
  templateUrl: "./delete-button.component.html",
  styleUrls: ["./delete-button.component.scss"]
})
export class DeleteButtonComponent {
  protected readonly faTrash = faTrash;
}
