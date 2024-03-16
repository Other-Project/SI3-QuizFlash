import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StatisticsComponent} from "./statistics/statistics.component";
import {InformationComponent} from "./information/information.component";
import {PatientComponent} from "./patient.component";

const routes: Routes = [
  {path: 'stats', component: StatisticsComponent},
  {path: 'infos', component: InformationComponent}
];

@NgModule({
  imports: [RouterModule.forChild([{
    path: 'patient',
    component: PatientComponent,
    children: routes
  }])],
  exports: [RouterModule]
})
export class PatientRoutingModule {
}
