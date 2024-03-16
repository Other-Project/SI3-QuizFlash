import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminComponent} from "./admin/admin.component";
import {PatientPageComponent} from "./patient/page/patient-page.component";

const routes: Routes = [
  {path: '', pathMatch: "full", redirectTo: 'admin'},
  {path: 'admin', component: AdminComponent},
  {path: 'patient', component: PatientPageComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
