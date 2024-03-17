import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminComponent} from "./admin/admin.component";
import{QuizComponent} from "./quiz/quiz.component";
import {PatientComponent} from "./patient/patient.component";

const routes: Routes = [
  {path: '', pathMatch: "full", redirectTo: 'admin'},
  {path: 'admin', component: AdminComponent},
  {path: 'patient', component: PatientComponent},
  {path: 'admin', component: AdminComponent},
  {path:'quiz', component: QuizComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
