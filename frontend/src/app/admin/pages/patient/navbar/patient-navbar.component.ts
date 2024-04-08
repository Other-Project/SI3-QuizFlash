import {Component, EventEmitter, Output} from "@angular/core";
import {TabNavigation} from "../patient.component";

@Component({
  selector: 'patient-navbar',
  templateUrl: 'patient-navbar.component.html',
  styleUrls: ['patient-navbar.component.scss']
})

export class PatientNavbarComponent{
  @Output() tabToSwitch: EventEmitter<TabNavigation> = new EventEmitter<TabNavigation>();

  switchTab(tab: TabNavigation) {
    this.tabToSwitch.emit(tab);
  }

  protected readonly TabNavigation = TabNavigation;
}
