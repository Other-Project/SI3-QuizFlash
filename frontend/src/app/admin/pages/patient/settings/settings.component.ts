import {Component, EventEmitter, Input, Output, ViewChild} from "@angular/core";
import {OptionsComponent} from "../options/options.component";
import {Patient} from "../../../../../models/patient.models";

@Component({
  selector: 'patient-settings',
  templateUrl: 'settings.component.html',
  styleUrls: ['settings.component.scss']
})

export class PatientSettingsComponent{
  @ViewChild(OptionsComponent) optionsComponent?: OptionsComponent;
  @Output() dementiaLevelUpdate: EventEmitter<number> = new EventEmitter();
  @Output() onSettingsChange: EventEmitter<Patient> = new EventEmitter();
  @Input() patient?: Patient;

  dementiaLevelChange(newDementiaLevel: number) {
    this.optionsComponent?.changeDementiaLevel(newDementiaLevel);
    this.dementiaLevelUpdate.emit(newDementiaLevel);
  }

  optionsChanges(patient: Patient) {
    this.onSettingsChange.emit(patient);
  }
}
