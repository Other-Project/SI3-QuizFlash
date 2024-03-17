import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {QuizComponent} from "./quiz.component";

const routes: Routes = [
];

@NgModule({
  imports: [RouterModule.forChild([{
    path: 'quiz',
    component: QuizComponent,
    children: routes
  }])],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
