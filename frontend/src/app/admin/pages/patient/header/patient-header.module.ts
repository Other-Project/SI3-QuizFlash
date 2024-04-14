import {NgModule} from "@angular/core";
import {PatientHeaderComponent} from "./patient-header.component";
import {LayoutModule} from "../../../../layout/layout.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgIf, NgStyle} from "@angular/common";
import {InfoFormComponent} from "../info-form/info-form.component";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {RouterLink} from "@angular/router";

@NgModule({
  declarations: [
    PatientHeaderComponent,
    InfoFormComponent
  ],
  exports: [
    PatientHeaderComponent
  ],
  imports: [
    LayoutModule,
    FormsModule,
    NgStyle,
    NgIf,
    ReactiveFormsModule,
    FaIconComponent,
    RouterLink
  ]
})

export class PatientHeaderModule {
}
