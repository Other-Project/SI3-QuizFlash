import {Component, Input, ViewChild} from "@angular/core";
import {OptionsComponent} from "../options/options.component";
import {User} from "../../../../../models/user.models";

@Component({
  selector: 'patient-settings',
  templateUrl: 'settings.component.html',
  styleUrls: ['settings.component.scss']
})

export class PatientSettingsComponent{
  settings: {[key: string]: any} = {"deafness":"1","dementia":"1"};
  @ViewChild(OptionsComponent) optionsComponent: OptionsComponent | undefined;
  @Input() user!: User | undefined;

  choiceChange(eventData: { id: string, value: any }) {
    this.settings[eventData.id] = eventData.value;
    this.optionsComponent?.changeOptions(this.settings);
  }
}
