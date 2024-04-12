import {Component, Input, OnInit} from "@angular/core";
import {UserService} from "../../../../../service/user.service";
import {Patient} from "../../../../../models/patient.models";

@Component({
  selector: 'font-size-selector',
  templateUrl: 'font-size.component.html',
  styleUrls: ['font-size.component.scss']
})

export class FontSizeComponent implements OnInit {
  @Input() user?: Patient;
  fontSize: string = "";

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.fontSize = (this.user?.fontSize ?? 1) + "em";
  }

  changeFontSize($event: any): void {
    const value = $event.target.value;
    this.fontSize = value + "em";
    this.userService.updateFontSize(this.user!.id, value);
  }
}
