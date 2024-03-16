import {NgModule} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {InterestsComponent} from "../interests/interests.component";
import {PatientSettingsComponent} from "../settings/settings.component";
import {SettingsModule} from "../settings/settings.module";

@NgModule({
  declarations: [
    InterestsComponent,
    PatientSettingsComponent
  ],
  exports: [
    InterestsComponent,
    PatientSettingsComponent
  ],
  imports: [
    NgOptimizedImage,
    SettingsModule
  ]
})

export class InformationModule{
}
