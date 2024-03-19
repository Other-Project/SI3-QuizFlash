import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StatisticsComponent} from "./statistics/statistics.component";
import {InformationComponent} from "./information/information.component";
import {PatientComponent} from "./patient.component";
import {AdminComponent} from "../../admin.component";

const routes: Routes = [
  {path: 'infos', component: InformationComponent},
  {path: 'stats', component: StatisticsComponent}
];

@NgModule({
  imports: [RouterModule.forChild([
    {
      path: 'admin',
      component: AdminComponent,
      children: [
        {
          path: 'patient/:user_id',
          component: PatientComponent,
          children: routes
        }]
    }
  ])],
  exports: [RouterModule]
})
export class PatientRoutingModule {
}
