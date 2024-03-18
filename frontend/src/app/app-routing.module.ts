import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminComponent} from "./admin/admin.component";
import{QuizComponent} from "./quiz/quiz.component";
import {ProfilesComponent} from "./profiles/profiles.component";

const routes: Routes = [
  {path: '', pathMatch: "full", component:ProfilesComponent},
  {path: 'admin', component: AdminComponent},
  {path:'quiz', component: QuizComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
