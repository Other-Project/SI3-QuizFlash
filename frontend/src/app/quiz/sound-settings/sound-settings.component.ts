import {AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild} from "@angular/core";


@Component({
  selector: 'sound-settings',
  templateUrl: './sound-settings.component.html',
  styleUrls: ['./sound-settings.component.scss']
})

export class SoundSettingsComponent {
  public gainValue: number = 2;

  constructor() {
  }

  gainChange(event: any) {
    this.gainValue = event.target.value;
  }

  @Output() soundSettingsFinish: EventEmitter<any> = new EventEmitter<any>();
  next() {
    this.soundSettingsFinish.emit();
  }
}
