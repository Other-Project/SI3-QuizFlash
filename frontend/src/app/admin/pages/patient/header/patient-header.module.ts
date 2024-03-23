import {NgModule} from "@angular/core";
import {PatientHeaderComponent} from "./patient-header.component";
import {EditButtonComponent} from "../edit-button/edit-button.component";
import {LayoutModule} from "../../../../layout/layout.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgIf, NgStyle} from "@angular/common";
import {InfoFormComponent} from "../info-form/info-form.component";

@NgModule({
  declarations: [
    PatientHeaderComponent,
    EditButtonComponent,
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
    ReactiveFormsModule
  ]
})

export class PatientHeaderModule {
}
