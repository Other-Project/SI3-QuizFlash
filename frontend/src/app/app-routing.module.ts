import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminComponent} from "./admin/admin.component";
import{QuizComponent} from "./quiz/quiz.component";

const routes: Routes = [
  {path: '', pathMatch: "full", redirectTo: 'admin'},
  {path: 'admin', component: AdminComponent},
  {path:'', pathMatch:"full", redirectTo:'quiz'},
  {path:'quiz', component: QuizComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
