import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminComponent} from "./admin/admin.component";
import {QuizComponent} from "./quiz/quiz.component";
import {QuizSectionComponent} from "./quiz/quiz-section/quiz-section.component";
import {FinishPageComponent} from "./quiz/finish/finish-page.component";
import {AdminPatientsComponent} from "./admin/pages/patients/admin-patients.component";
import {PatientComponent} from "./admin/pages/patient/patient.component";
import {AdminQuizzComponent} from "./admin/pages/quizz/admin-quizz.component";
import {InformationComponent} from "./admin/pages/patient/information/information.component";
import {StatisticsComponent} from "./admin/pages/patient/statistics/statistics.component";
import {QuizSelectionComponent} from "./quiz/quiz-selection/quiz-selection.component";

const routes: Routes = [
  {path: '', pathMatch: "full", redirectTo: 'admin'},
  {
    path: 'admin', component: AdminComponent, children: [
      {path: 'patients', component: AdminPatientsComponent},
      {
        path: 'patient/:user_id', component: PatientComponent, children: [
          {path: '', pathMatch: 'full', redirectTo: 'infos'},
          {path: 'infos', component: InformationComponent},
          {path: 'stats', component: StatisticsComponent}
        ]
      },
      {path: 'quizz', component: AdminQuizzComponent}
    ]
  },
  {
    path: 'quiz', component: QuizComponent, children: [
      {path: '', pathMatch: 'full', component: QuizSelectionComponent}
    ]
  },
  {
    path: 'quiz/:quiz_id', component: QuizComponent, children: [
      {path: '', pathMatch: 'full', redirectTo: 'question'},
      {path: 'question', component: QuizSectionComponent},
      {path: 'finish', component: FinishPageComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
