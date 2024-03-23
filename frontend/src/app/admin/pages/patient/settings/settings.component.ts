import {Component, EventEmitter, Input, Output, ViewChild} from "@angular/core";
import {OptionsComponent} from "../options/options.component";
import {User} from "../../../../../models/user.models";

@Component({
  selector: 'patient-settings',
  templateUrl: 'settings.component.html',
  styleUrls: ['settings.component.scss']
})

export class PatientSettingsComponent{
  @ViewChild(OptionsComponent) optionsComponent?: OptionsComponent;
  @Output() dementiaLevelUpdate: EventEmitter<any> = new EventEmitter
  @Input() user?: User;

  dementiaLevelChange(newDementiaLevel: number) {
    //TODO LANCER UN UPDATE SERVEUR
    this.optionsComponent?.changeDementiaLevel(newDementiaLevel);
    this.dementiaLevelUpdate.emit(newDementiaLevel);
  }
}
