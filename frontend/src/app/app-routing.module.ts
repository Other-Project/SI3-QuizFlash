import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientHeaderComponent } from "./patient/header/patient-header.component";
import {PatientPageComponent} from "./patient/page/patient-page.component";

const routes: Routes = [
  { path: 'patient', component: PatientPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
