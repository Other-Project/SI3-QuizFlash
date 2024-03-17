import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {QuizComponent} from "./quiz.component";
import {IntermediatePageComponent} from "./intermediate-page/intermediate-page.component";
import {QuizSectionComponent} from "./quiz-section/quiz-section.component";
import {FinishPageComponent} from "./finish/finish-page.component";

const routes: Routes = [
  {path: '', pathMatch: "full", redirectTo: 'quiz'},
  {path:'intermediate/:check', component: IntermediatePageComponent},
  {path:'question', component: QuizSectionComponent},
  {path:'finish', component: FinishPageComponent}

];

@NgModule({
  imports: [RouterModule.forChild([{
    path: 'quiz',
    component: QuizComponent,
    children: routes
  }])],
  exports: [RouterModule]
})
export class QuizRoutingModule {
}
